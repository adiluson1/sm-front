import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {TemplateMobx, TemplateStore} from "@/store/Template";
import {Observer} from "mobx-vue";
import TableInput from "@/components/Table/TableInput";
import CellInput from "@/components/Table/CellInput";
import {Cell} from "@/entities/Cell";
import {Row} from "@/entities/Row";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import VirtualList from "vue-virtual-scroll-list"
import {PropType} from "vue";

@Observer
@Component({
    components:{
        TableInput,
        CellInput,
        'virtual-scroll': VirtualList
    }
})
export class TemplateTable extends Vue {

    @Prop({type: Boolean, default: false})
    readonly select: boolean;
    @Prop({type: Object as PropType<Cell>,default: new Cell()})
    cell: Cell;
    store: TemplateMobx = TemplateStore;
    rowId: number = 0;

    async mounted() {
        console.log(this.cell);
        if (this.select && this.cell.id) {
            let link = this.cell.link[0];
            this.rowId = link.id;
            console.log(this.rowId)
        }
    }

    @Watch('cell')
    onCellChanged(cell: Cell) {
        if (this.select && cell.id) {
            let link = cell.link[0];
            this.rowId = link.id;
            console.log(this.rowId)
        }
    }

    //@Watch('rowId')
    async onRowIdChanged(rowId: number) {
        let load = this.$buefy.loading.open({});
        let cell = JSON.parse(JSON.stringify(this.cell));
        let row = new Row();
        row.id = rowId;
        cell.link = [row];
        let res = await Server.post(routes.cell.createLink,cell);
        res = await res.json();
        load.close();
        if (res.ok) {
            this.$router.back();
        }
    }


    render() {
        return(
            <b-field>
                <virtual-scroll size={40} remain={20}>
            <table class="table">
                <tr>
                    {
                        this.select &&
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
                                this.select &&
                                <td>
                                    <b-radio v-model={this.rowId}  native-value={row.id} oninput={() => this.onRowIdChanged(row.id)}/>
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
                </virtual-scroll>
            </b-field>
        )
    }
}
