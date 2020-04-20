import {Pagination} from "@/service/Pagination";
import {Template} from "@/entities/Template";
import {Server} from "@/service/Server";
import {routes} from "@/service/routes";


export class TemplateService {

    static async all():Promise<Pagination<Template>> {
        let res = await Server.get(routes.templates);
        return  await res.json();
    }
}