import { FileService } from './FileService';
import { Request } from 'express';
import fs from 'fs';

const sampleCSVPath = 'sample.csv';

beforeAll(() => {
  const sampleData = 'column1,column2\nvalue1,value2\nvalue3,value4';
  fs.writeFileSync(sampleCSVPath, sampleData);
});

afterAll(() => {
  fs.unlinkSync(sampleCSVPath);
});

describe('FileService', () => {
  const fileService = new FileService();

  describe('processFile', () => {
    it('should throw an error if no file is uploaded', async () => {
      const req = { file: null } as unknown as Request;

      await expect(fileService.processFile(req)).rejects.toThrow('No file uploaded');
    });

    it('should process the file and return data rows', async () => {
      const req = {
        file: {
          path: sampleCSVPath,
        },
      } as unknown as Request;

      const result = await fileService.processFile(req);

      expect(result).toEqual([
        { column1: 'value1', column2: 'value2' },
        { column1: 'value3', column2: 'value4' },
      ]);
    });
  });

  describe('parseCSV', () => {
    it('should parse a CSV file and return data rows', async () => {
      const result = await fileService.parseCSV(sampleCSVPath);

      expect(result).toEqual([
        { column1: 'value1', column2: 'value2' },
        { column1: 'value3', column2: 'value4' },
      ]);
    });
  });
});
