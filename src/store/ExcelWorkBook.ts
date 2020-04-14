import { action, computed, observable } from "mobx";

export interface Sheet {
    sheetName: string;
    content: any[];
}


export class ExcelWorkBook {
    @observable list: Sheet[] = [];

    @computed
    get count() {
        return this.list.length;
    }
}

export const Workbook = new ExcelWorkBook();