import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById
} from '../../controllers/users/controller.js';

const router = express.Router();

router.post('/signup', createUser);

router.get('/', getAllUsers);

router.get('/:uid', getUserById);

export default router;
