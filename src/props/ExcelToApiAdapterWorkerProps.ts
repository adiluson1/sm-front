import {Template} from "@/entities/Template";
import {Row} from "@/entities/Row";


export interface ExcelToApiAdapterWorkerProps {
    template: Template
    data: any[][]
    oldRows: Row[]
}