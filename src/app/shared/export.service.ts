import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private static saveAsExcelFile(buffer: Buffer, filename: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE})
    FileSaver.saveAs(data, `${filename}_${new Date().getTime()}${EXCEL_EXTENSION}`)
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
      cellStyles: true,
    });
    const workBook: XLSX.WorkBook = {Sheets: {data: workSheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workBook, {
      bookType: 'xlsx', type: 'array'
    });
    ExportService.saveAsExcelFile(excelBuffer, excelFileName);
  }
}
