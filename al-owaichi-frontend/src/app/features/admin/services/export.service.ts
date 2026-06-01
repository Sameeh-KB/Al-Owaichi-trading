import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({ providedIn: 'root' })
export class ExportService {

  /**
   * Export any array of objects to an .xlsx file and trigger a browser download.
   * @param data     Array of plain objects (rows)
   * @param sheet    Sheet tab name inside the workbook
   * @param filename Downloaded file name (without extension)
   */
  toXlsx(data: Record<string, unknown>[], sheet: string, filename: string): void {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheet);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
}
