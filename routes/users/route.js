import express from 'express';
import { getUserById } from '../../controllers/users/controller.js';

const router = express.Router();

router.get('/:uid', getUserById);

export default router;
