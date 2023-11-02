import { Router } from 'express';
import upload from '../config/multer.config';
import { fileController } from '../controllers/file.controller';

const fileRoutes = Router();

fileRoutes.post('/', upload.single('file'), fileController.uploadFile);

export default fileRoutes;