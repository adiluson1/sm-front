import {Template} from "@/entities/Template";

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
    createdAt: string;
    updatedAt: string;
}
