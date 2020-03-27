import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import Card from "@/components/Card";
import {Dictionary} from "@/entities/Dictionary";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import TableInput from "@/components/Table/TableInput";

@Component({
    components: {
        HeadComponent,
        Card,
        TableInput
    }
})
export default class All extends Vue {
    list: Dictionary[] = [];

    async mounted() {
        let res = await Server.get(routes.dictionaries);
        if (res.ok) this.list = await res.json();
    }

    async delete(id: number) {
        try {
            await Server.delete(routes.dictionaries,id);
            let index = this.list.findIndex(temp=> temp.id === id)
            if (index > -1) this.list.splice(index,1)
        } catch (e) {
            console.error(e.message)
        }
    }
    async update(e: any) {
        let dict: any = this.list.find(temp=> temp.id === e.id);
        if (dict) {
            let oldTemplate = JSON.parse(JSON.stringify(dict));
            dict[e.type] = e.value;
            let res = await Server.put(routes.dictionaries,dict);
            if (!res.ok) dict = oldTemplate
        }
    }

    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {this.$t('dictionary.dictionaries')}
                    <template slot="left">
                        <router-link to="/dictionary/add" class="button is-success">
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
                            this.list.map(dict => {
                                return <tr>
                                    <td>{dict.id}</td>
                                    <td>
                                        <table-input
                                            value={dict.name}
                                            type="name"
                                            id={dict.id}
                                            onChanged={(e: any) => this.update(e)}
                                        />
                                    </td>
                                    <td>
                                        <span
                                            onclick={() => this.delete(dict.id)}>
                                            <b-icon icon="delete"/>
                                        </span>
                                        <router-link to={`/dictionary/${dict.id}`}>
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

