import { diskStorage } from 'multer';
import * as path from 'path';

const storage = diskStorage({
  destination: (req, file, cb) => {
    let fullPath = path.join(process.cwd(), `./uploads/users`);
    return cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    const uniqueFileName = '12356' + file.originalname;
    cb(null, uniqueFileName);
  },
});

export default storage;
