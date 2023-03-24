import express from 'express';

import { validateCreatePlace, validateUpdatePlace } from '../../validators/places/validators.js';
import {
    createPlace, 
    getPlaceByPlaceId,
    getPlacesByUserId, 
    updatePlaceByPlaceId,
    deletePlaceByPlaceId, 
} from '../../controllers/places/controller.js';

const router = express.Router();

router.post('/', validateCreatePlace(), createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.patch('/:pid', validateUpdatePlace(), updatePlaceByPlaceId);

router.delete('/:pid', deletePlaceByPlaceId);

export default router;
