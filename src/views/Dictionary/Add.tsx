import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import Card from "@/components/Card";
import {FormContainer} from "@/container/FormContainer";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import {Dictionary} from "@/entities/Dictionary";

@Component({
    components: {
        HeadComponent,
        Card
    }
})
export default class Add extends Vue {

    form: FormContainer<Dictionary> = new FormContainer<Dictionary>(new Dictionary());

    async create() {
        let data = this.form.copyData();
        let res = await Server.post(routes.dictionaries,data);
        if (res.ok) return this.$router.back();
        console.log(res.json())
    }


    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {`${this.$t('action.add')} ${this.$t('dictionary.dictionary')}`}
                </head-component>
                <card>
                    <b-field horizontal label={this.$t('table.name')}>
                        <b-input name="subject" v-model={this.form.data.name}/>
                    </b-field>
                    <p class="control">
                        <button
                            onClick={this.create}
                            class="button is-success">
                            {this.$t('action.create')}
                        </button>
                    </p>
                </card>
            </div>
        )
    }
}
