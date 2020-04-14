import { Component, Vue } from "vue-property-decorator"
import {TemplateMobx, TemplateStore} from "@/store/Template";
import {Observer} from "mobx-vue";
import TableInput from "@/components/Table/TableInput";
import CellInput from "@/components/Table/CellInput";

@Observer
@Component({
    components:{
        TableInput,
        CellInput
    }
})
export class TemplateTable extends Vue {

    store: TemplateMobx = TemplateStore;


    render() {
        return(
            <table class="table">
                <tr>
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
                    this.store.rows.items.map(row=> {
                        return <tr>
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
        )
    }
}
