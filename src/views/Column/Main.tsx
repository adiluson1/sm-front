import { Component, Vue } from "vue-property-decorator"


@Component
export default class Main extends Vue {


    render() {
        return(
            <router-view/>
        )
    }
}
