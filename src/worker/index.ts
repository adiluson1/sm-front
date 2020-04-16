import ApiToExcelAdapter from 'worker-loader?name=dist/[name].js!./workers/ApiToExcelAdapter.Worker'
import ExcelToApiAdapter from 'worker-loader?name=dist/[name].js!./workers/ExcelToApiAdapter.Worker'



export const ApiToExcelAdapterWorker = ApiToExcelAdapter;
export const ExcelToApiAdapterWorker = ExcelToApiAdapter;