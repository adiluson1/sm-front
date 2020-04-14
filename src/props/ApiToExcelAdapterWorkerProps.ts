import {Col} from "@/entities/Col";
import {Row} from "@/entities/Row";

export interface ApiToExcelAdapterWorkerProps {
    columns: Col[]
    rows: Row[]
    includes: number[]
}