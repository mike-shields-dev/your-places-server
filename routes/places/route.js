import express from 'express';
import { getPlaceByPlaceId, getPlacesByUserId } from '../../controllers/places/controller.js';

const router = express.Router();

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);


export default router;
