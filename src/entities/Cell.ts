import {Row} from "@/entities/Row";
import {Col} from "@/entities/Col";
import {Tree} from "@/entities/Tree";
import {ConverterValue} from "@/entities/ConverterValue";

export class Cell {

    constructor(
        public id: number = 0,
        public intVal: number = 0,
        public doubleVal: number = 0,
        public varcharVal: string = '',
        public textVal: string = '',
        public booleanVal: boolean = false,
        public row?: Row,
        public column?: Col,
        public tree?: Tree,
        public converterValue?: ConverterValue,
        public createdAt?: string,
        public updatedAt?: string
    ) {}
}