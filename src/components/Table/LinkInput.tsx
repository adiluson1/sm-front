import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {Cell} from "@/entities/Cell";
import {routes} from "@/service/routes";
import {Server} from "@/service/Server";
import {Row} from "@/entities/Row";


@Component
export default class LinkInput extends Vue{

    @Prop({type: Object as () => Cell, default: ''})
    value: Cell;
    localValue: Cell = new Cell();
    link: Row = new Row();

    mounted() {
        this.localValue = this.value;
        console.log(this.value)
    }

    @Watch('value')
    onValueChanged(val: Cell) {
        this.localValue = val;
    }

    async createEmptyCellLink() {
        let cell = this.localValue;
        let response = await Server.post(routes.cells,cell);
        let savedCell = await response.json();
        let templateId = 0;
        let column = this.localValue.column;
        if (column.link.length) {
            let link = column.link[0];
            templateId = link.id;
        }
        let link = `/template/${templateId}/choose-content?cell=${savedCell.id}`;
        await this.$router.push(link)
    }

    get showRowLink() {
        let link = this.localValue.link;
        let result = '';
        if (link.length)
            result = `/row?id=${link[0].id}`;
        return result;
    }

    render() {
        return (<div>
                {
                    this.localValue.link.length > 0 ?
                        <div class="buttons">
                            <router-link to={this.showRowLink} class="button">
                                <b-icon icon="eye"/>
                            </router-link>
                            <button class="button" onclick={() => this.$emit('remove',this.localValue)}>
                                <b-icon icon="delete-outline"/>
                            </button>
                        </div>
                        :
                        <div class="buttons">
                            <span onclick={this.createEmptyCellLink}>empty</span>
                        </div>
                }
        </div>)
    }
}