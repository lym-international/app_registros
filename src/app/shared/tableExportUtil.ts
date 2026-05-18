import { Workbook } from 'exceljs';
import { TableElement } from './TableElement';

const getFileName = (name: string) => {
  const timeSpan = new Date().toISOString();
  const sheetName = name || 'ExportResult';
  const fileName = `${sheetName}-${timeSpan}`;
  return { sheetName, fileName };
};

export class TableExportUtil {
  static exportToExcel(arr: Partial<TableElement>[], name: string): void {
    const { sheetName, fileName } = getFileName(name);

    const wb = new Workbook();
    const ws = wb.addWorksheet(sheetName);

    if (arr.length === 0) return;

    const headers = Object.keys(arr[0] as object);
    ws.addRow(headers);
    arr.forEach(item => {
      ws.addRow(headers.map(key => (item as any)[key] ?? ''));
    });

    wb.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }).catch(err => console.error('Export error:', err));
  }
}