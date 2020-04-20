import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {TemplateMobx, TemplateStore} from "@/store/Template";
import {Observer} from "mobx-vue";
import TableInput from "@/components/Table/TableInput";
import CellInput from "@/components/Table/CellInput";
import {Cell} from "@/entities/Cell";
import {Row} from "@/entities/Row";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";

@Observer
@Component({
    components:{
        TableInput,
        CellInput
    }
})
export class TemplateTable extends Vue {

    cellId: any = 0;
    store: TemplateMobx = TemplateStore;
    rowId: number = 0;

    mounted() {
        this.cellId = this.$route.query.cell;
    }

    @Watch('rowId')
    async onRowIdChanged(rowId: number) {
        let load = this.$buefy.loading.open({});
        let cell = new Cell();
        cell.id = this.cellId;
        let row = new Row();
        row.id = this.rowId;
        cell.link.push(row);
        let res = await Server.post(routes.cell.createLink,cell);
        res = await res.json();
        if (res.ok) {
            this.$router.back();
        }
        load.close()
    }


    render() {
        return(
            <b-field>
            <table class="table">
                <tr>
                    {
                        this.cellId > 0 &&
                        <th>Choose row</th>
                    }
                    {
                        this.store.template.columns.map(col=>{
                            return <th>
                                <table-input
                                    value={col.name}
                                    type="name"
                                    id={col.id}
                                    onChanged={(e: any) => this.store.updateColumn(e)}
                                />
                            </th>
                        })
                    }
                </tr>
                {
                    this.store.hasNewRow &&
                    <tr>
                        {
                            this.store.newRow.cells.map(cell=>{
                                return <td>
                                    <cell-input
                                        value={cell}
                                        type="name"
                                        id={cell.id}
                                        onChanged={(e: any) => this.store.createCel(e)}
                                    />
                                </td>
                            })
                        }
                    </tr>
                }
                {
                    this.store.rows.map(row=> {
                        return <tr>
                            {
                                this.cellId > 0 &&
                                <td>
                                    <b-radio v-model={this.rowId}  native-value={row.id} />
                                </td>
                            }
                            {
                                row.cells.map(cell => {
                                    return <td><cell-input
                                        value={cell}
                                        type="name"
                                        id={cell.id}
                                        onChanged={(e: any) => this.store.updateCell(e)}
                                        onRemove={(e:any) => this.store.removeCell(e)}
                                    /></td>
                                })
                            }
                        </tr>
                    })
                }
            </table>
            </b-field>
        )
    }
}
