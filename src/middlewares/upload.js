// backend/src/middlewares/upload.js
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// директория для сохранения аватарок
const UPLOAD_DIR = path.join(__dirname, '../../uploads');
// если папки нет — создаём
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// настраиваем storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e8)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// создаём сам middleware
const upload = multer({ storage });

module.exports = upload;
