import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import {Template} from "@/entities/Template";
import { Card } from "ant-design-vue";
import TableInput from "@/components/Table/TableInput";


@Component({
    components: {
        HeadComponent,
        Card,
        TableInput
    }
})
export default class One extends Vue {

    template: Template = new Template();

    async mounted() {
        let id = this.$route.params.id;
        let res = await Server.get(routes.templates + '/' + id);
        this.template = await res.json();
        console.log(this.template)
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
                    <table class="table">
                        <tr>
                            <th>{this.$t('table.id')}</th>
                            <th>{this.$t('table.name')}</th>
                            <th>{this.$t('table.actions')}</th>
                        </tr>
                        {
                            this.template.columns.map(col => {
                                return <tr>
                                    <td>{col.id}</td>
                                    <td>
                                        <table-input
                                            value={col.name}
                                            type="name"
                                            id={col.id}
                                            onChanged={(e: any) => this.update(e)}
                                        />
                                    </td>
                                    <td>
                                            <span
                                                onclick={() => this.delete(col.id)}>
                                                <b-icon icon="delete"/>
                                            </span>
                                    </td>
                                </tr>
                            })
                        }
                    </table>
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
                    </table>
                </card>
            </div>
        )
    }
}
