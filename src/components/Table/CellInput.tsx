import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {Cell} from "@/entities/Cell";
import {CellType} from "@/entities/Col";


@Component
export default class CellInput extends Vue {

    @Prop({type: Object as () => Cell, default: ''})
    value: Cell;
    @Prop({type: Number, required: true})
    id!: number;
    @Prop({type: String, default: ''})
    type!: string;
    isInput: boolean = false;
    localValue: Cell = new Cell();

    mounted() {
        this.localValue = this.value
    }

    @Watch('value')
    onValueChanged(val: Cell) {
        this.localValue = val;
    }
    onChanged() {
        this.$emit('changed',{
            id: this.id,
            type: this.type,
            value: this.localValue
        });
        this.isInput = false
    }

    get cellType() {
        let type = this.localValue.column.cellType;
        switch (type) {
            case CellType.VARCHAR:
                return 'varcharVal';
            default:
                return 'intVal';
        }
    }
    remove() {
        if (!this.localValue.row.id) {
            //@ts-ignore
            this.localValue[this.cellType] = this.value[this.cellType];
        } else {
            this.$emit('remove',this.localValue);
        }
        this.isInput = false;
    }


    render() {
        return(
            <div>
                {
                    (this.isInput) ?
                        <b-field>
                            <b-input v-model={this.localValue[this.cellType]}/>
                            <p class="control">
                                <button class="button" onClick={this.onChanged}><b-icon icon="check"/></button>
                                <button class="button" onClick={this.remove}><b-icon icon="delete-outline"/></button>
                            </p>
                        </b-field> :
                        <span onClick={()=>this.isInput = true }>{this.localValue[this.cellType] || "empty"}</span>
                }
            </div>

        )
    }
}
