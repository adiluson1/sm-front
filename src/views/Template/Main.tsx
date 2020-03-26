import { Component, Vue} from "vue-property-decorator";

@Component
export default class Main extends Vue {

    render() {
        return (
            <div>
                <router-view/>
            </div>
        )
    }
}