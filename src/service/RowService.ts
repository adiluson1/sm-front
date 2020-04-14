import {routes} from "@/service/routes";
import {Server} from "@/service/Server";
import {runInAction} from "mobx";
import {Row} from "@/entities/Row";
import {Cell} from "@/entities/Cell";
import {Template} from "@/entities/Template";
import {Pagination} from "@/service/Pagination";

export class RowService {
    static async getRowsByTemplate(template: Template) {
        let rows: Pagination<Row> = new Pagination<Row>([]);
        let url = routes.rows + `?templateid=${template.id}`;
        let res =  await Server.get(url);
        rows = await res.json();
        let newRows: Row[] = [];
        for(let oldRow of rows.items) {
            let cellMap = new Map();
            for (let cell of oldRow.cells) {
                cellMap.set(cell.column.id,cell);
            }
            oldRow.cells = [];
            for (let column of template.columns) {
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
                    cell.template = template;
                    oldRow.cells.push(cell)
                }
            }
            newRows.push(oldRow);
        }
        rows.items = newRows;
        return rows;
    }
}