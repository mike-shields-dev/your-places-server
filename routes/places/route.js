import express from 'express';
import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlaceByPlaceId,
    deletePlaceByPlaceId,
} from '../../controllers/places/controller.js';

const router = express.Router();

router.post('/', createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.patch('/:pid', updatePlaceByPlaceId);

router.delete('/:pid', deletePlaceByPlaceId);

export default router;
