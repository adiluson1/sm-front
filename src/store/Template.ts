import {action, computed, observable, runInAction} from "mobx";
import {Pagination} from "@/service/Pagination";
import {Row} from "@/entities/Row";
import {Template} from "@/entities/Template";
import {Cell} from "@/entities/Cell";
import {routes} from "@/service/routes";
import {Server} from "@/service/Server";


export class TemplateMobx {
    @observable template: Template = new Template();
    @observable rows: Pagination<Row> = new Pagination<Row>([]);
    @observable newRow: Row = new Row();
    @observable hasNewRow: boolean = false;

    @action.bound
    async init(id: string | number) {
        let res = await Server.get(routes.templates + '/' + id);
        let template = await res.json();
        runInAction(() => this.template = template);
        await this.getRowsByTemplateId(id);
    }

    @action.bound
    addRow() {
        const length = this.newRow.cells.length;
        if (!length) {
            let row: Cell[] = [];
            for (let column of  this.template.columns) {
                let cell = new Cell();
                cell.row = new Row();
                cell.column = column;
                cell.template = this.template;
                row.push(cell)
            }
            runInAction(() =>{
                this.newRow.cells = row;
                this.hasNewRow = true;
            })
        }
    }

    @action.bound
    async getRowsByTemplateId(templateId: number | string) {
        let url = routes.rows + `?templateid=${templateId}`;
        let res =  await Server.get(url);
        let rows = await res.json();
        runInAction(() => {
            this.rows = rows;
        });
        let newRows: Row[] = [];
        for(let oldRow of this.rows.items) {
            let cellMap = new Map();
            for (let cell of oldRow.cells) {
                cellMap.set(cell.column.id,cell);
            }
            oldRow.cells = [];
            for (let column of this.template.columns) {
                if (cellMap.has(column.id)) {
                    let cell = cellMap.get(column.id);
                    let row = new Row();
                    row.id = oldRow.id;
                    cell.row = row;
                    oldRow.cells.push(cell);
                } else {
                    let cell = new Cell();
                    cell.column = column;
                    cell.row = oldRow;
                    cell.template = this.template;
                    oldRow.cells.push(cell)
                }
            }
            newRows.push(oldRow);
        }
        runInAction(() => {
            this.rows.items = newRows
        });
    }

    @action.bound
    async deleteColumn(id: number) {
        await Server.delete(routes.columns,id);
        let index = this.template.columns.findIndex(column=> column.id === id);
        if (index > -1){
            runInAction(() => {
                this.template.columns.splice(index,1)
            });
        }
    }
    @action.bound
    async updateColumn(e: any) {
        let column: any = this.template.columns.find(column=> column.id === e.id);
        if (column) {
            let oldTemplate = JSON.parse(JSON.stringify(column));
            column[e.type] = e.value;
            let res = await Server.put(routes.columns,column);
        }
    }

    @action.bound
    async createCel(e:any) {
        let cell = e.value;
        let row = new Row();
        row.template = this.template;
        let res = await Server.post(routes.rows,row);
        row = await res.json();
        cell.row = row;
        res = await Server.post(routes.cells,cell);
        if (res.ok) {
            cell = await res.json();
            row.cells = [];
            for (let column of this.template.columns) {
                if (cell.column.id != column.id) {
                    let newCell = new Cell();
                    newCell.template = this.template;
                    newCell.column = column;
                    row.cells.push(newCell)
                } else {
                    row.cells.push(cell);
                }
            }
            runInAction(() => {
                this.rows.items.unshift(row);
                this.newRow = new Row();
                this.hasNewRow = false;
            });
        }
    }

    @action.bound
    async updateCell( e:any) {
        let cell = e.value;
        let rowId = cell.row.id;
        let row = new Row();
        row.id = rowId;
        cell.row = row;
        await Server.put(routes.cells,cell);
        await this.getRowsByTemplateId(this.template.id);
    }

    @action.bound
    async removeCell(cell: Cell) {
        await Server.delete(routes.cells,cell.id);
        await this.getRowsByTemplateId(this.template.id)
    }

    @action.bound
    async removeColumn(id: number){
        await Server.delete(routes.columns,id);
        let templateId = this.template.id;
        let res = await Server.get(routes.templates + '/' + templateId);
        let newTemplate = await res.json();
        runInAction(() => {
            this.template = newTemplate;
        })
        await this.getRowsByTemplateId(id);
    }
}

export const TemplateStore = new TemplateMobx();