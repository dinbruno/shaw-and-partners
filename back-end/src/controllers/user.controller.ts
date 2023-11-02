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
      return res.status(200).json({ message: 'Todos os usuários foram deletados com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar todos os usuários: ', error);
      return res.status(500).json({ message: 'Erro interno do servidor ao tentar deletar todos os usuários.' });
    }
  }

}

export const userController = new UserController();
