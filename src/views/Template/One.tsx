import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import {Template} from "@/entities/Template";
import { Card } from "ant-design-vue";
import TableInput from "@/components/Table/TableInput";
import {Cell} from "@/entities/Cell";
import {Row} from "@/entities/Row";
import CellInput from "@/components/Table/CellInput";
import {Pagination} from "@/service/Pagination";

@Component({
    components: {
        HeadComponent,
        Card,
        TableInput,
        CellInput
    }
})
export default class One extends Vue {

    template: Template = new Template();
    rows: Pagination<Row> = new Pagination<Row>([]);
    newRow: Row = new Row();
    showNewRow = false;

    async mounted() {
        let id = this.$route.params.id;
        let res = await Server.get(routes.templates + '/' + id);
        this.template = await res.json();
        await this.getRowsByTemplateId(id);
    }

    async getRowsByTemplateId(templateId: number | string) {
        let url = routes.rows + `?templateid=${templateId}`;
        let res =  await Server.get(url);
        this.rows = await res.json();
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
        this.rows.items = newRows
    }

    async delete(id: number) {
        try {
            await Server.delete(routes.columns,id);
            let index = this.template.columns.findIndex(temp=> temp.id === id)
            if (index > -1) this.template.columns.splice(index,1)
        } catch (e) {
            console.error(e.message)
        }
    }
    async update(e: any) {
        let template: any = this.template.columns.find(temp=> temp.id === e.id);
        if (template) {
            let oldTemplate = JSON.parse(JSON.stringify(template));
            template[e.type] = e.value;
            let res = await Server.put(routes.columns,template);
            if (!res.ok) template = oldTemplate
        }
    }

    addRow() {
        if (!this.newRow.cells.length) {
            let columns = this.template.columns;
            let row = [];
            for (let column of columns) {
                let cell = new Cell();
                cell.row = new Row();
                cell.column = column;
                cell.template = this.template;
                this.newRow.cells.push(cell)
            }
        }
    }

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
            this.rows.items.unshift(row);
            this.newRow = new Row();
        }
    }

    async updateCell( e:any) {
        let cell = e.value;
        let rowId = cell.row.id;
        let row = new Row();
        row.id = rowId;
        cell.row = row;
        await Server.put(routes.cells,cell);
        await this.getRowsByTemplateId(this.template.id);
    }

    async removeCell(cell: Cell) {
        await Server.delete(routes.cells,cell.id);
        await this.getRowsByTemplateId(this.template.id)
    }

    async removeColumn(id: number){
        await Server.delete(routes.columns,id);
        let templateId = this.$route.params.id;
        let res = await Server.get(routes.templates + '/' + templateId);
        this.template = await res.json();
        await this.getRowsByTemplateId(id);
    }

    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {`${this.$t('template.template')}: ${this.template.name}`}
                </head-component>
                <card>
                    <div class="level">
                        <div class="level-left">
                            <h5 class="subtitle">{this.$t('column.columns')}</h5>
                        </div>
                        <div class="level-right">
                            <router-link
                                to={`/template/${this.template.id}/add-column`}>
                                <b-icon icon="plus"/>
                            </router-link>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-2">
                            {
                                !this.newRow.cells.length &&
                                <b-button onclick={this.addRow}>{this.$t('template.button.addRow')}</b-button>
                            }
                        </div>
                        <div class="column is-2">

                        </div>
                    </div>
                </card>
                <card>
                    <table class="table">
                        <tr>
                            {
                                this.template.columns.map(col=>{
                                    return <th>
                                        <table-input
                                            value={col.name}
                                            type="name"
                                            id={col.id}
                                            onChanged={(e: any) => this.update(e)}
                                        />
                                    </th>
                                })
                            }
                        </tr>
                        {
                            this.newRow.cells.length > 0 &&
                                <tr>
                                    {
                                        this.newRow.cells.map(cell=>{
                                            return <td>
                                                <cell-input
                                                    value={cell}
                                                    type="name"
                                                    id={cell.id}
                                                    onChanged={(e: any) => this.createCel(e)}
                                                />
                                            </td>
                                        })
                                    }
                                </tr>
                        }
                        {
                            this.rows.items.map(row=> {
                                return <tr>
                                    {
                                        row.cells.map(cell => {
                                            return <td><cell-input
                                                value={cell}
                                                type="name"
                                                id={cell.id}
                                                onChanged={(e: any) => this.updateCell(e)}
                                                onRemove={(e:any) => this.removeCell(e)}
                                            /></td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </table>
                </card>
            </div>
        )
    }
}
