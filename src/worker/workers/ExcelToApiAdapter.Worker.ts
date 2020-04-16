import {ExcelToApiAdapterWorkerProps} from "@/props/ExcelToApiAdapterWorkerProps";
import {Row} from "@/entities/Row";
import {Cell, getCellKey} from "@/entities/Cell";
import {Template} from "@/entities/Template";

const ctx: Worker = self as any;

ctx.onmessage= async event => {
    let prop = await event.data;
    const result = excelToApi(prop);
    ctx.postMessage(result);
    close()
};

function coordinateMapFromOldRows(row: Row[]) {

    let result = new Map([]);
    row.forEach( r => {
        r.cells.forEach( cell => {
            let key = `${r.id}:${cell.column.id}`;
            result.set(key,cell.id);
        })
    });
    return result;
}


function excelToApi(props: ExcelToApiAdapterWorkerProps) {
    let {
        template,
        data,
        oldRows
    } = props;
    let rows = [];
    let headers = data.shift();
    let columns = new Map();
    if (headers) {
        template.columns.forEach(col=>columns.set(col.name,col));
        let addressMap = coordinateMapFromOldRows(oldRows);
        let headersMap = new Map();
        headers.forEach((head,index)=> headersMap.set(index,head));
        let idOfIndex = headers.findIndex((head) => head === 'id');
        let newTemplate = new Template();
        newTemplate.id = template.id;

        for (let row of data) {
            let newRow = new Row();
            newRow.template = newTemplate;
            newRow.id = 0;
            row.forEach((cell,index) => {
                if (idOfIndex === index) {
                    newRow.id = cell
                } else {
                    let column = columns.get(headersMap.get(index));
                    if (cell && column) {
                        let newCell = new Cell();
                        newCell.template = newTemplate;
                        newCell.column = column;
                        //@ts-ignore
                        newCell[getCellKey(newCell)] = cell;
                        newRow.cells.push(newCell);
                    }
                }
            });
            rows.push(newRow);
        }

        rows.forEach(row => {
            row.cells.forEach(cell => {
                let key = `${row.id}:${cell.column.id}`;
                let id = addressMap.get(key);
                //@ts-ignore
                if (id) cell.id = id;
            })
        })
    }
    return rows;
}