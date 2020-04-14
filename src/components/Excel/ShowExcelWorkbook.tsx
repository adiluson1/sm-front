import { Component, Vue} from "vue-property-decorator";
import {Observer} from "mobx-vue";
import {Workbook} from "@/store/ExcelWorkBook";

@Observer
@Component
export default class ShowExcelWorkbook extends Vue{

    store = Workbook;
    activeTab:number = 0;

    render() {
        return (
            <div>
                <b-tabs v-model={this.activeTab}>
                    {
                        this.store.list.map(sheet => {
                            return <b-tab-item label={sheet.sheetName}>
                                <table class="table">
                                    {
                                        sheet.content.map(row =>{
                                            return <tr>
                                                {
                                                   Object.values(row).map(cell => {
                                                       return <td>{cell}</td>
                                                   })
                                                }
                                            </tr>
                                        })
                                    }
                                </table>
                            </b-tab-item>
                        })
                    }
                </b-tabs>
            </div>
        )
    }
}