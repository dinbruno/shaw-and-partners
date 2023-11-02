import { Request, Response } from "express";
import { storageService } from "../services/StorageService";
import { fileService } from "../services/FileService";
import path from "path";

class FileController {
  async uploadFile(req: Request, res: Response): Promise<void> {
    const data = await fileService.processFile(req);
    storageService.addData(data);
    res.status(200).json({ message: "The file was uploaded successfully." });
  }

}

export const fileController = new FileController();
