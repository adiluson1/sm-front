import {Row} from "@/entities/Row";
import {CellType, Col} from "@/entities/Col";
import {Tree} from "@/entities/Tree";
import {ConverterValue} from "@/entities/ConverterValue";
import {Template} from "@/entities/Template";

export class Cell {

    public id: number = 0;
    public intVal: number = 0;
    public doubleVal: number = 0;
    public varcharVal: string = '';
    public textVal: string = '';
    public booleanVal: boolean = false;
    public row: Row;
    public column: Col;
    public tree?: Tree;
    template: Template;
    public converterValue?: ConverterValue;
    public createdAt: string;
    public updatedAt: string;

    constructor() {
        this.column = new Col();
    }

}

export const getCellValue = (cell: Cell) => {
    switch (cell.column.cellType) {
        case CellType.VARCHAR:
            return cell.varcharVal;
        case CellType.INTEGER:
            return cell.intVal;
        case CellType.BOOLEAN:
            return cell.booleanVal;
        case CellType.DOUBLE:
            return cell.doubleVal;
        case CellType.TEXT:
            return cell.textVal;
        default:
            return ''
    }
};

export const getCellKey = (cell: Cell) => {
    switch (cell.column.cellType) {
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