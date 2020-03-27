export class FormContainer<T> {
    error: any = {};
    data: T;

    constructor(obj: T){
        this.data = obj
        for (let key in obj) {
            Object.defineProperty(this.error,key,{
                writable: true,
                configurable: true,
                enumerable: true,
                value: ''
            })
        }
    }

    hasError(propertyName: string) {
        // eslint-disable-next-line no-prototype-builtins
        return this.error.hasOwnProperty(propertyName)
    }
    getError(propertyName: string): string {
        let errMsgs = this.error[propertyName]
        return errMsgs ? errMsgs[0] : ''
    }
    setError(propertyName: string, value: any[]):void {
        this.error[propertyName] = value
    }
    setErrors(errors: any) {
        for (let key in errors)
            this.error[key] = errors[key][0]
    }


    dataToJson():string {
        return JSON.stringify(this.data)
    }
    copyData() {
        return JSON.parse(this.dataToJson())
    }
    clear() {
        this.setDefaults(this.data)
        this.setDefaults(this.error)
    }
    private setDefaults(obj: any) {
        for (let key in obj) {
            obj[key] = this.setDefault(obj[key])
        }
        return obj
    }
    private setDefault(data: any) {
        let type: string = typeof data
        type = Array.isArray(data) ? 'array' : type
        switch (type) {
            case 'array':
                return []
            case 'object' :
                data = this.setDefaults(data)
                return data
            case 'string':
                return ''
            case 'number':
                return 0
            case 'boolean':
                return false
        }
    }
}