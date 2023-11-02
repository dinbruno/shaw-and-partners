import fs from 'fs';
import path from 'path';

export class DirectoryService {
  directoryPath: string;

  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
  }

  async deleteAllCurrentFiles(): Promise<void> {
    if (fs.existsSync(this.directoryPath)) {
      const files = await fs.promises.readdir(this.directoryPath);

      for (const file of files) {
        const filePath = path.join(this.directoryPath, file);
        await fs.promises.unlink(filePath);
      }
    } else {
      throw new Error(`Directory not found: ${this.directoryPath}`);
    }
  }
}
