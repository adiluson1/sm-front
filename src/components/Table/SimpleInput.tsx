import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {Cell} from "@/entities/Cell";
import {CellType} from "@/entities/Col";


@Component
export default class SimpleInput extends Vue {

    @Prop({type: Object as () => Cell, default: ''})
    value: Cell;
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
        this.$emit('change',this.localValue);
        this.isInput = false
    }

    get cellType(): string {
        let type = this.localValue.column.cellType;
        switch (type) {
            case CellType.VARCHAR:
                return 'varcharVal';
            case CellType.INTEGER:
                return 'intVal';
            case CellType.BOOLEAN:
                return 'booleanVal';
            case CellType.DOUBLE:
                return 'doubleVal';
            case CellType.TEXT:
                return 'textVal';
            default:
                return 'booleanVal';
        }
    }

    get cellValue() {
        switch (this.localValue.column.cellType) {
            case CellType.VARCHAR:
                return this.localValue.varcharVal;
            case CellType.INTEGER:
                return this.localValue.intVal;
            case CellType.BOOLEAN:
                return this.localValue.booleanVal;
            case CellType.DOUBLE:
                return this.localValue.doubleVal;
            case CellType.TEXT:
                return this.localValue.textVal;
            default:
                return '';
        }
    }
    clearValue():void {
        switch (this.localValue.column.cellType) {
            case CellType.VARCHAR:
                this.localValue.varcharVal = "";
                break;
            case CellType.INTEGER:
                this.localValue.intVal = 0;
                break;
            case CellType.BOOLEAN:
                this.localValue.booleanVal = false;
                break;
            case CellType.DOUBLE:
                this.localValue.doubleVal = 0;
                break;
            case CellType.TEXT:
                this.localValue.textVal = "";
                break;
        }
    }
    remove() {
        if (!this.localValue.row.id) {
            this.clearValue()
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
                            {
                                this.localValue.column.cellType === CellType.VARCHAR &&
                                <input type="text" v-model={this.localValue.varcharVal}/>
                            }
                            {
                                this.localValue.column.cellType === CellType.INTEGER &&
                                <input type="number" v-model={this.localValue.intVal}/>
                            }
                            {
                                this.localValue.column.cellType === CellType.BOOLEAN &&
                                <b-switch
                                    true-value={true}
                                    false-value={false}
                                    v-model={this.localValue.booleanVal}/>
                            }
                            {
                                this.localValue.column.cellType === CellType.DOUBLE &&
                                <input type="number" v-model={this.localValue.doubleVal}/>
                            }
                            {
                                this.localValue.column.cellType === CellType.TEXT &&
                                <textarea class="textarea" v-model={this.localValue.textVal}/>
                            }
                            <p class="control">
                                <button class="button" onClick={this.onChanged}><b-icon icon="check"/></button>
                                <button class="button" onClick={this.remove}><b-icon icon="delete-outline"/></button>
                            </p>
                        </b-field> :
                        <span onClick={()=>this.isInput = true }>{this.cellValue || "empty"}</span>
                }
            </div>

        );
    }
}