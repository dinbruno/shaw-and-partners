import { Request, Response } from 'express';
import { storageService } from '../services/StorageService';

class UserController {
  searchUsers(req: Request, res: Response) {
    const searchTerm = req.query.q as string;

    const users = storageService.searchData(searchTerm);
    return res.status(200).json({ data: users });
  }
  deleteAllUsers(req: Request, res: Response) {
    try {
      storageService.clearData();
      return res.status(200).json({ message: 'All users have been successfully deleted.' });
    } catch (error) {
      console.error('Error deleting all users: ', error);
      return res.status(500).json({ message: 'Internal server error while trying to delete all users.' });
    }
  }

}

export const userController = new UserController();
