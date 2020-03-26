import {Converter} from "./Converter";

export enum Operator {
    ADD
}

export class Formula {
    operator: Operator;
    operand: number;
}

export class ConverterValue {

    id: number;
    name: string;
    formula: Formula[];
    converter: Converter;
    createdAt?: string;
    updatedAt?: string;
}