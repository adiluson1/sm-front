import {Component, Vue} from "vue-property-decorator"
import {HeadComponent} from "@/components/HeadComponent";
import Card from "@/components/Card";
import {FormContainer} from "@/container/FormContainer";
import {Template} from "@/entities/Template";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";
import {CellType, Col, ColumnType} from "@/entities/Col";
import {Pagination} from "@/service/Pagination";
import {TemplateService} from "@/service/TemplateService";

@Component({
    components: {
        HeadComponent,
        Card
    }
})
export default class Add extends Vue {

    form: FormContainer<Col> = new FormContainer<Col>(new Col());
    template: Template = new Template();
    templates: Pagination<Template> = new Pagination<Template>();
    link: Template = new Template();

    async create() {
        let data = this.form.copyData();
        data.template = this.template;
        if (data.columnType === ColumnType.LINK)
            data.link = [this.link];
        let res = await Server.post(routes.columns,data);
        if (res.ok) return this.$router.back();
        console.log(res.json())
    }

    async mounted() {
        let load = this.$buefy.loading.open({});
        let id = this.$route.params.id;
        let res = await Server.get(`${routes.templates}/ ${id}`);
        this.template = await res.json();
        this.template.columns = [];
        this.templates = await TemplateService.all();
        load.close();
    }


    render() {
        return(
            <div>
                <head-component
                    onBack={() => this.$router.back()}>
                    {this.$t('template.createColumnHead',{name: this.template.name})}
                </head-component>
                <card>
                    <b-field horizontal label={this.$t('table.name')}>
                        <b-input name="subject" v-model={this.form.data.name}/>
                    </b-field>
                    <b-field horizontal label={this.$t('column.columnType')}>
                        <b-select v-model={this.form.data.columnType}>
                            <option value={ColumnType.SIMPLE}>
                                {this.$t('columnType.SIMPLE')}
                            </option>
                            <option value={ColumnType.TREE}>
                                {this.$t('columnType.TREE')}
                            </option>
                            <option value={ColumnType.CONVERTER}>
                                {this.$t('columnType.CONVERTER')}
                            </option>
                            <option value={ColumnType.LINK}>
                                {this.$t('columnType.LINK')}
                            </option>
                        </b-select>
                    </b-field>
                    {
                        this.form.data.columnType === ColumnType.LINK ?
                        <b-field horizontal label={this.$t('template.templates')}>
                            <b-select v-model={this.link}>
                                {
                                    this.templates.items.map(template => {
                                        return <option value={template}>
                                            {template.name}
                                        </option>
                                    })
                                }
                            </b-select>
                        </b-field>
                        :
                        <b-field horizontal label={this.$t('column.cellType')}>
                            <b-select v-model={this.form.data.cellType}>
                                <option value={CellType.INTEGER}>
                                    {this.$t('cellType.INTEGER')}
                                </option>
                                <option value={CellType.DOUBLE}>
                                    {this.$t('cellType.DOUBLE')}
                                </option>
                                <option value={CellType.VARCHAR}>
                                    {this.$t('cellType.VARCHAR')}
                                </option>
                                <option value={CellType.TEXT}>
                                    {this.$t('cellType.TEXT')}
                                </option>
                                <option value={CellType.BOOLEAN}>
                                    {this.$t('cellType.BOOLEAN')}
                                </option>
                            </b-select>
                        </b-field>
                    }

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

