import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { protect } from '../middleware/auth.js';

fs.mkdirSync('uploads', { recursive: true });

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    /^image\//.test(file.mimetype) ? cb(null, true) : cb(new Error('Only image files are allowed')),
});

const router = Router();

router.post('/', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.status(201).json({ url: '/uploads/' + req.file.filename });
  });
});

export default router;