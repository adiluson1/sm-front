const api = process.env.VUE_APP_BACKEND_API;


export class Server {
    static async get(uri: string, data?: any) {
        let url = api + uri;
        return await fetch(url, {body: data})
    }
    static async post(uri: string, data?: any) {
        let url = api + uri;

        return await fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                method: "post"
            }
        )
    }

    static async put(uri: string, data?: any) {
        let url = api + uri;

        return await fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                method: "put"
            }
        )
    }

    static async delete(uri: string, id: number) {
        let url = api + uri + '/' + id;
        return await fetch(
            url,
            {
                method: "delete"
            }
        )
    }
}