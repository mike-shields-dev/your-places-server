import multer from 'multer';
import { v4 as uuid } from 'uuid'

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};


const fileUpload = multer({
    limits: 500_000,
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            
            cb(null, 'uploads/images')
        },

        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            const filename = `${uuid()}.${ext}`
            
            cb(null, filename);
        }, 
    }),

    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!')
        
        cb(error, isValid);
    }
});

export { fileUpload };
