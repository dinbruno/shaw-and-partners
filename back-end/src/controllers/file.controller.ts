import { Request, Response } from "express";
import { storageService } from "../services/StorageService";
import { fileService } from "../services/FileService";
import { DirectoryService } from "../services/DirectoryService";
import path from "path";

class FileController {
  async uploadFile(req: Request, res: Response): Promise<void> {
    const data = await fileService.processFile(req);
    storageService.addData(data);
    res.status(200).json({ message: "The file was uploaded successfully." });
  }

  async deleteAllFiles(req: Request, res: Response): Promise<void> {
    try {
      const uploadDirectory = path.join(__dirname, '..', 'dist', 'uploads');
      const directoryService = new DirectoryService(uploadDirectory);

      await directoryService.deleteAllCurrentFiles();

      res.status(200).json({ message: "All files were deleted successfully." });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error deleting files: " + error.message });
    }
  }
}

export const fileController = new FileController();
