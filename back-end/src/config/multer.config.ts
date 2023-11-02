import multer, { FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);
}

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'text/csv' || path.extname(file.originalname).toLowerCase() === '.csv') {
    cb(null, true);
  } else {
    cb(new Error('Only .csv files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  }
});

export default upload;
