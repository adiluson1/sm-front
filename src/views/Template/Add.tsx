import { Component, Vue } from "vue-property-decorator"
import { HeadComponent} from "@/components/HeadComponent";
import Card from "@/components/Card";
import {FormContainer} from "@/container/FormContainer";
import {Template} from "@/entities/Template";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";

@Component({
    components: {
        HeadComponent,
        Card
    }
})
export default class Add extends Vue {

    templateForm: FormContainer<Template> = new FormContainer<Template>(new Template());

    async create() {
        let data = this.templateForm.copyData();
        let res = await Server.post(routes.templates,data);
        if (res.ok) return this.$router.back();
        console.log(res.json())
    }


    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {this.$t('template.add')}
                </head-component>
                <card>
                    <b-field horizontal label={this.$t('table.name')}>
                        <b-input name="subject" v-model={this.templateForm.data.name}/>
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
