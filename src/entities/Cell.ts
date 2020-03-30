import {Row} from "@/entities/Row";
import {Col} from "@/entities/Col";
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