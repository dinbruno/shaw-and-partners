import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/', userController.searchUsers);

router.delete('/delete', userController.deleteAllUsers);


export default router;