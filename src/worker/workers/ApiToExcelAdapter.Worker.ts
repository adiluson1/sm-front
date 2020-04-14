// Worker.ts
import {cellTypeStr, Col, ColumnType} from "@/entities/Col";
import {Row} from "@/entities/Row";
import {getCellValue} from "@/entities/Cell";
import {ApiToExcelAdapterWorkerProps} from "@/props/ApiToExcelAdapterWorkerProps";

const ctx: Worker = self as any;



ctx.onmessage= async event => {
    let prop = await event.data;
    const result = apiToExcel(prop);
    ctx.postMessage(result);
    close()
};

function apiToExcel(prop: ApiToExcelAdapterWorkerProps) {
    let response = [];
    let headers = [];
    let {
        columns,
        rows,
        includes
    } = prop;

    headers.push('id');
    let includesSet = new Set(includes);

    for (let column of columns)
        if (includesSet.has(column.id))
            headers.push(column.name);

    for (let row of rows) {
        let rowResult = [];
        rowResult.push(row.id);
        for (let cell of row.cells) {
            if (includesSet.has(cell.column.id)) {
                if (cell.column.columnType === ColumnType.SIMPLE) {
                    rowResult.push(getCellValue(cell))
                }
            }
        }
        response.push(rowResult);
    }
    response.unshift(headers);
    return response;
}