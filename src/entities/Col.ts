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
    DICTIONARY,
    CONVERTER
}



export class Col {

    constructor(
        id: number = 0,
        name: string = '',
        createdAt: string,
        updatedAt: string,
    ) {}
}