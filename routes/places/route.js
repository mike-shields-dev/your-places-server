import express from 'express';
import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
} from '../../controllers/places/controller.js';

const router = express.Router();

router.post('/', createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);


export default router;
