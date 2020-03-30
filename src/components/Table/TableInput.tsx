import {Component, Prop, Vue, Watch} from "vue-property-decorator"


@Component
export default class TableInput extends Vue {

    @Prop({type: String, default: ''})
    value!: string;
    @Prop({type: Number, required: true})
    id!: number;
    @Prop({type: String, default: ''})
    type!: string;
    isInput: boolean = false;
    localValue: string = '';

    mounted() {
        this.localValue = this.value
    }

    @Watch('value')
    onValueChanged(val: string) {
        this.localValue = val;
    }
    onChanged() {
        this.$emit('changed',{
            id: this.id,
            type: this.type,
            value: this.localValue
        })
        this.isInput = false
    }


    render() {
        return(
            <div>
                {
                    (this.isInput || this.localValue == "") ?
                        <b-field>
                            <b-input v-model={this.localValue}/>
                            <p class="control">
                                <button class="button" onClick={this.onChanged}><b-icon icon="check"/></button>
                            </p>
                        </b-field> :
                        <span onClick={()=>this.isInput = true }>{this.localValue}</span>
                }
            </div>

        )
    }
}
