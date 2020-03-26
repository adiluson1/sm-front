import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
    }
})
export default class App extends Vue {

    entity = '';

    mounted() {
        this.entity = this.$route.params.entity
    }

    render() {
        return (
            <div>
                {this.entity}
            </div>
        )
    }
}
