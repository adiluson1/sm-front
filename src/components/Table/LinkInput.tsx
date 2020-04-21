import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {Cell} from "@/entities/Cell";
import {Row} from "@/entities/Row";
import {Observer} from "mobx-vue";
import {TemplateMobx, TemplateStore} from "@/store/Template";

@Observer
@Component
export default class LinkInput extends Vue{

    @Prop({type: Object as () => Cell, default: ''})
    value: Cell;
    localValue: Cell = new Cell();
    link: Row = new Row();
    store: TemplateMobx = TemplateStore;

    mounted() {
        this.localValue = this.value;
        console.log(this.value)
    }

    @Watch('value')
    onValueChanged(val: Cell) {
        this.localValue = val;
    }

    async createOrUpdate() {
        let templateId = this.localValue.template.id;
        let columnId = this.localValue.column.id;
        let cellId = this.localValue.id;
        let rowId = this.localValue.row.id;
        let id = 0;

        let column = this.store.template.columns.find(col=> col.id === columnId);
        if (column && column.link.length) {
            let link = column.link[0];
            id = link.id;
        }
        let link = `/template/${id}/choose-content?cell=${cellId}&template=${templateId}&column=${columnId}&row=${rowId}`;
        this.store.setCellsToNewRow([]);
        await this.$router.push(link)
    }

    render() {
        return (<div>
                {
                    this.localValue.link.length > 0 ?
                        <div class="buttons">
                            <button class="button" onclick={this.createOrUpdate}>
                                <b-icon icon="eye"/>
                            </button>
                            <button class="button" onclick={() => this.$emit('remove',this.localValue)}>
                                <b-icon icon="delete-outline"/>
                            </button>
                        </div>
                        :
                        <div class="buttons">
                            <span onclick={this.createOrUpdate}>empty</span>
                        </div>
                }
        </div>)
    }
}