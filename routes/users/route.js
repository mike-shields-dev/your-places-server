import express from 'express';
import {
    createUser,
    loginUser,
    getAllUsers,
} from '../../controllers/users/controller.js';

import { fileUpload } from '../../middleware/file-upload.js';

import {
    validateCreateUser,
} from '../../validators/users/validators.js';

const router = express.Router();

router.post('/signup', 
    fileUpload.single('image'), 
    validateCreateUser(), 
    createUser
);

router.post('/login', loginUser);

router.get('/', getAllUsers);

export default router;
