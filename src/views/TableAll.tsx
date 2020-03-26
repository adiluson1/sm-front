import { Component, Vue} from "vue-property-decorator";

export class TableAll extends Vue {

    render() {
        return (
            <div>
                <a-form label-col="labelCol" wrapper-col="wrapperCol">
                <a-form-item
                    label="Fail"
                    validate-status="error"
                    help="Should be combination of numbers & alphabets"
                >
                    <a-input id="error" placeholder="unavailable choice" />
                </a-form-item>
                </a-form>
            </div>
        )
    }
}