// DirectoryService.test.ts

import fs from 'fs';
import path from 'path';
import { DirectoryService } from './DirectoryService';

async function createTempDirectoryWithCsv(rootDir: string): Promise<string> {
  const tempDirectory = path.join(rootDir, 'tempDir');
  await fs.promises.mkdir(tempDirectory, { recursive: true });

  const originalCsvFilePath = path.join(rootDir, 'csv-test.csv');
  const tempCsvFilePath = path.join(tempDirectory, 'csv-test.csv');
  
  await fs.promises.copyFile(originalCsvFilePath, tempCsvFilePath);

  return tempDirectory;
}

describe('DirectoryService', () => {
  let tempDirectory: string;
  const rootDir = path.resolve(__dirname, '..'); 

  beforeAll(async () => {
    tempDirectory = await createTempDirectoryWithCsv(rootDir);
  });

  afterAll(async () => {
    await fs.promises.rmdir(tempDirectory, { recursive: true });
  });

  test('should delete the CSV file in the directory', async () => {
    const directoryService = new DirectoryService(tempDirectory);

    await directoryService.deleteAllCurrentFiles();

    const files = await fs.promises.readdir(tempDirectory);
    expect(files).toHaveLength(0);
  });
});
