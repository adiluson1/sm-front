import {Row} from "./Row";
import {Col} from "./Col";
import {Cell} from "./Cell";


export class Template {

    id: number;
    name: string;
    rows?: Row[];
    columns?: Col[];
    cells?: Cell[];
}