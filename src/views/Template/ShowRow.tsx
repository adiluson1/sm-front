import {Component, Vue, Watch} from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import { Card } from "ant-design-vue";
import XLSX from "xlsx";
import {Sheet, Workbook} from "@/store/ExcelWorkBook";
import {Observer} from "mobx-vue";
import {TemplateMobx, TemplateStore} from "@/store/Template";
import { TemplateTable} from "@/components/Table/TemplateTable";
import ShowExcelWorkbook from "@/components/Excel/ShowExcelWorkbook";
import {toJS} from "mobx";



@Observer
@Component({
    components: {
        HeadComponent,
        Card,
        TemplateTable,
        ShowExcelWorkbook
    }
})
export default class One extends Vue {

    file: File| null = null;
    store: TemplateMobx = TemplateStore;


    async mounted() {
        let rowId = this.$route.params.id;
        await this.store.init(rowId);
        console.log(toJS(this.store.rows))
    }


    @Watch('file')
    uploadExcelFile(file:File) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
            //@ts-ignore
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, {type: 'array'});
            let JsonData = [];
            for (let sheetName of workbook.SheetNames) {
                let sheet = workbook.Sheets[sheetName];
                let jsonSheet = XLSX.utils.sheet_to_json(sheet,{header: "A"});
                JsonData.push({sheetName,content: jsonSheet});
            }
            Workbook.list = JsonData;
        }
    }

    async writeToExcel() {
        let load = this.$buefy.loading.open({});
        await this.store.writeToExcel();
        load.close();
    }

    async uploadFromExcel () {
        let load = this.$buefy.loading.open({});
        await this.store.addFromExcel();
        load.close();
    }

    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {`${this.$t('template.template')}: ${this.store.template.name}`}
                </head-component>
                <card>
                    {
                        Workbook.count ?
                            <div class="columns is-mobile">
                                <div class="column is-half">
                                    <show-excel-workbook/>
                                </div>
                                <div class="column is-half">
                                    <template-table/>
                                </div>
                            </div>
                            : <template-table/>
                    }

                </card>
            </div>
        )
    }
}