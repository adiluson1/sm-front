import {Component, Vue} from "vue-property-decorator";
import {Template} from "@/entities/Template";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import { HeadComponent} from "@/components/HeadComponent";
import TableInput from "@/components/Table/TableInput";
import Card from "@/components/Card";
import {Pagination} from "@/service/Pagination";
import {getCurrentDateStr} from "@/functions/Date";
import {TemplateService} from "@/service/TemplateService";

@Component({
    components: {
        HeadComponent,
        TableInput,
        Card
    }
})
export default class All extends Vue {

    templates: Pagination<Template> = new Pagination<Template>([]);

    async mounted() {
        await this.init()
    }

    async init() {
        this.templates = await TemplateService.all();
    }

    async delete(id: number) {
        try {
            await Server.delete(routes.templates,id);
            let index = this.templates.items.findIndex(temp=> temp.id === id);
            if (index > -1) this.templates.items.splice(index,1);
        } catch (e) {
            console.error(e.message)
        }
    }
    async update(e: any) {
        let template: any = this.templates.items.find(temp=> temp.id === e.id);
        if (template) {
            let oldTemplate = JSON.parse(JSON.stringify(template));
            template[e.type] = e.value;
            let res = await Server.put(routes.templates,template);
            if (!res.ok) template = oldTemplate
        }
    }
    async writeToExcel() {
        let rows:any[][] = [];
        let headers = ['id','name'];
        rows.push(headers);
        for (let template of this.templates.items) {
            rows.push([template.id,template.name])
        }
        await Excel.run(async (context) => {
            let newSheet = context.workbook.worksheets.add('Template' + getCurrentDateStr());
            let range = newSheet.getRangeByIndexes(0,0,rows.length,headers.length);
            range.values = rows;
            await context.sync()
        })
    }

    render() {
        return (
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {this.$t('template.templates')}
                    <template slot="left" class="buttons">
                        <router-link to="/template/add" class="button is-success">
                            <b-icon icon="plus"/>
                            <span>{this.$t('action.add')}</span>
                        </router-link>
                        <b-button onclick={this.writeToExcel}>write to excel</b-button>
                    </template>
                </head-component>
                <card>
                    <table class="table">
                        <tr>
                            <th>{this.$t('table.id')}</th>
                            <th>{this.$t('table.name')}</th>
                            <th>{this.$t('table.actions')}</th>
                        </tr>
                        {
                            this.templates.items.map(template => {
                                return <tr>
                                    <td>{template.id}</td>
                                    <td>
                                        <table-input
                                            value={template.name}
                                            type="name"
                                            id={template.id}
                                            onChanged={(e: any) => this.update(e)}
                                        />
                                    </td>
                                    <td>
                                        <span
                                            onclick={() => this.delete(template.id)}>
                                            <b-icon icon="delete"/>
                                        </span>
                                        <router-link to={`/template/${template.id}`}>
                                            <b-icon icon="eye"/>
                                        </router-link>
                                    </td>
                                </tr>
                            })
                        }
                    </table>
                </card>
            </div>
        )
    }
}