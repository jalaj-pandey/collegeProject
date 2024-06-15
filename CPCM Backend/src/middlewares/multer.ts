import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads');
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split('.').pop();
    const fileName = `${id}.${extName}`;
    callback(null, fileName);
  },
});

export const singleImageUpload = multer({storage}).single("photo");
export const singleResumeUpload = multer({storage}).single("resume");


const fileFilter = (req: any, file: any, cb: any) => {
  if (file.fieldname === "photo" || file.fieldname === "resume") {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("application/pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images or PDF files are allowed."), false);
    }
  } else {
    cb(new Error("Invalid field name. Only 'photo' and 'resume' are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

export default upload;
