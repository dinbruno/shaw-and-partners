import { Request } from 'express';
import fs from 'fs';
import csvParser from 'csv-parser';
import { DataRow } from './StorageService';

export class FileService {
  async processFile(req: Request): Promise<DataRow[]> {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const filePath = req.file.path;

    return this.parseCSV(filePath);
  }

 async parseCSV(filePath: string): Promise<DataRow[]> {
    const data: DataRow[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row: DataRow) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', reject);
    });
  }
}

export const fileService = new FileService();
