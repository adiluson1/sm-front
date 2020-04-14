


export default class MainWorkerProvider {
    connect(worker: Worker,arg:any): Promise<any> {
        return new Promise((resolve,reject) => {
            worker.postMessage(arg);
            worker.onmessage = (event) => {
                try{
                    resolve(event.data)
                }catch (e) {
                    console.error("MainWorkerProvider.",e);
                    reject(e)
                }
            };
            worker.onerror = event => {
                console.log('worker in breaking',event);
            }
        })
    }
}