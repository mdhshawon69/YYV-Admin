/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const allowMimeType = ['image/jpeg', 'image/png'];
const maxFileSize = 1 * 1024 * 1024;

export function fileUpload(path) {
  const multerConfig = {
    dest: './uploads', // specify the destination folder for uploaded files
    storage: diskStorage({
      destination: `./src/public/uploads/${path}`,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(
          null,
          file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
        );
      },
    }),
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (!allowMimeType.includes(file.mimetype)) {
        cb(new BadRequestException('Invalid file type'), false);
      } else {
        cb(null, true);
      }
    },
    onError: (err, next) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new BadRequestException('File size exceeds the limit'));
        } else {
          next(err);
        }
      } else {
        next(err);
      }
    },
  };

  return multerConfig;
}
