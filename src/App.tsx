import { Component, Vue } from "vue-property-decorator";
import MainLayout from "@/layouts/MainLayout";

@Component({
    components: {
        MainLayout
    }
})
export default class App extends Vue {
    render() {
        return (
            <main-layout>
                <router-view/>
            </main-layout>
        )
    }
}