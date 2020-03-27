import { Component, Vue} from "vue-property-decorator";
import {Template} from "@/entities/Template";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";

@Component
export default class All extends Vue {

    templates: Template[] = [];

    async mounted() {
        let res = await Server.get(routes.templates);
        this.templates = await res.json();
    }

    render() {
        return (
            <div>

            </div>
    )
    }
}