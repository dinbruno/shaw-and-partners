import { Request, Response } from 'express';
import { storageService } from '../services/StorageService';

class UserController {
  searchUsers(req: Request, res: Response) {
    const searchTerm = req.query.q as string;

    const users = storageService.searchData(searchTerm);
    return res.status(200).json({ data: users });
  }
}

export const userController = new UserController();
