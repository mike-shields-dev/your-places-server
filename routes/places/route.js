import express from 'express';
import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    deletePlaceByPlaceId,
} from '../../controllers/places/controller.js';

const router = express.Router();

router.post('/', createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.delete('/:pid', deletePlaceByPlaceId);


export default router;
