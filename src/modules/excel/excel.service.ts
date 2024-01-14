import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  async exportToExcel(data: any[], filePath: string, sheetName: string) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(sheetName);
    const excludedFields = ['_id', '__v', 'event'];

    if (sheetName) {
      sheet.addRow([sheetName]).getCell(1).alignment = { horizontal: 'center' };

      sheet.addRow([]); // Add an empty row for separation
    }

    const filteredData = data.map((item) => {
      const filteredItem: any = {};
      Object.keys(item).forEach((key) => {
        if (!excludedFields.includes(key)) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });

    const headers = Object.keys(filteredData[0]);
    const newHerders = sheet.addRow(headers);
    newHerders.font = { bold: true };

    data.forEach((item) => {
      const row = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });

      sheet.addRow(row);
    });

    await workbook.xlsx.writeFile(filePath);
  }
}
