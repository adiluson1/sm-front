import {Component, Vue, Watch} from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import { Card } from "ant-design-vue";
import XLSX from "xlsx";
import {Sheet, Workbook} from "@/store/ExcelWorkBook";
import {Observer} from "mobx-vue";
import {TemplateMobx, TemplateStore} from "@/store/Template";
import { TemplateTable} from "@/components/Table/TemplateTable";
import ShowExcelWorkbook from "@/components/Excel/ShowExcelWorkbook";
import MainWorkerPrivider from "@/worker/providers/MainWorkerProvider";



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
        let id = this.$route.params.id;
        await this.store.init(id);
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

    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {`${this.$t('template.template')}: ${this.store.template.name}`}
                </head-component>
                <card>
                    <div class="level">
                        <div class="level-left">
                            <h5 class="subtitle">{this.$t('column.columns')}</h5>
                        </div>
                        <div class="level-right">
                            <router-link
                                to={`/template/${this.store.template.id}/add-column`}>
                                <b-icon icon="plus"/>
                            </router-link>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-2">
                            {
                                !this.store.newRow.cells.length &&
                                <b-button onclick={this.store.addRow}>{this.$t('template.button.addRow')}</b-button>
                            }
                        </div>
                        <div class="column is-2">
                            <b-upload v-model={this.file}>
                                <a class="button is-primary">
                                    <b-icon icon="upload"></b-icon>
                                    <span>Click to upload</span>
                                </a>
                            </b-upload>
                        </div>
                        <div class="column is-2">
                            <b-button onclick = {this.writeToExcel}>
                                    write to excel
                            </b-button>
                        </div>
                    </div>
                </card>
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
