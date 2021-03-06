import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import TableInput from "@/components/Table/TableInput";
import Card from "@/components/Card";
import {Col} from "@/entities/Col";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import {Pagination} from "@/service/Pagination";

@Component({
    components: {
        HeadComponent,
        TableInput,
        Card
    }
})
export default class All extends Vue {

    columns: Pagination<Col> = new Pagination<Col>([]);

    async mounted() {
        let res = await Server.get(routes.columns);
        this.columns = await res.json();
    }

    async delete(id: number) {
        try {
            await Server.delete(routes.columns,id);
            let index = this.columns.items.findIndex(temp=> temp.id === id)
            if (index > -1) this.columns.items.splice(index,1)
        } catch (e) {
            console.error(e.message)
        }
    }
    async update(e: any) {
        let template: any = this.columns.items.find(temp=> temp.id === e.id);
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
                    {this.$t('column.columns')}
                    <template slot="left">
                        <router-link to="/column/add" class="button is-success">
                            <b-icon icon="plus"/>
                            <span>{this.$t('action.add')}</span>
                        </router-link>
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
                            this.columns.items.map(col => {
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
            </div>
        )
    }
}
