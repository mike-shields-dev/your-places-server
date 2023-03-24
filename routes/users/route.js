import express from 'express';
import {
    createUser,
    loginUser,
    getAllUsers,
} from '../../controllers/users/controller.js';

import {
    validateCreateUser,
} from '../../validators/users/validators.js';

const router = express.Router();

router.post('/signup', validateCreateUser(), createUser);

router.post('/login', loginUser);

router.get('/', getAllUsers);

export default router;
