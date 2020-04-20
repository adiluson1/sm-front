import {Template} from "@/entities/Template";
import {Cell} from "@/entities/Cell";

export enum CellType {
    INTEGER,
    DOUBLE,
    VARCHAR,
    TEXT,
    BOOLEAN
}

export enum ColumnType {
    SIMPLE,
    TREE,
    LINK,
    CONVERTER
}



export class Col {

    id: number;
    name: string;
    cellType: CellType;
    columnType: ColumnType;
    template: Template;
    link: Template[];
    createdAt: string;
    updatedAt: string;

    constructor() {
        this.cellType = CellType.BOOLEAN;
        this.link = [];
    }
}

export const cellTypeStr = (cellType: CellType):string => {

    switch (cellType) {
        case CellType.VARCHAR:
            return 'varcharVal';
        case CellType.INTEGER:
            return 'intVal';
        case CellType.BOOLEAN:
            return 'booleanVal';
        case CellType.DOUBLE:
            return 'doubleVal';
        case CellType.TEXT:
            return 'textVal';
        default:
            return ''
    }
};


