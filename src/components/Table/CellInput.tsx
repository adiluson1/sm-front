import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {Cell} from "@/entities/Cell";
import LinkInput from "@/components/Table/LinkInput";
import SimpleInput from "@/components/Table/SimpleInput";
import {ColumnType} from "@/entities/Col";


@Component({
    components: {
        LinkInput,
        SimpleInput
    }
})
export default class CellInput extends Vue {

    @Prop({type: Object as () => Cell, default: ''})
    value: Cell;
    @Prop({type: Number, required: true})
    id!: number;
    @Prop({type: String, default: ''})
    type!: string;
    localValue: Cell = new Cell();

    mounted() {
        this.localValue = this.value
    }

    @Watch('value')
    onValueChanged(val: Cell) {
        this.localValue = val;
    }
    onChanged(value: any) {
        this.$emit('change',{
            id: this.id,
            type: this.type,
            value
        });
    }


    render() {
        return(
            <div>
                {
                    this.localValue.column.columnType === ColumnType.LINK ?
                        <link-input
                            onshow = {(e: any) => this.$emit('show',e)}
                            onremove = {(e: any) => this.$emit('remove',e)}
                            value={this.localValue}/>
                        :
                        <simple-input
                            onchange = { (e: any) => this.onChanged(e)}
                            onremove = { (e: any) => this.$emit('remove',e)}
                            value={this.localValue}/>
                }
            </div>

        )
    }
}
