const api = process.env.VUE_APP_BACKEND_API;


export class Server {
    static async get(uri: string, data?: any) {
        let url = api + uri;
        return await fetch(url, {body: data})
    }
}