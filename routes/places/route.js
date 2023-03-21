import express from 'express';

import {
    createPlaceValidator,
    updatePlaceValidator
} from '../../validators/places/validators.js';


import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlaceByPlaceId,
    deletePlaceByPlaceId,
} from '../../controllers/places/controller.js';

const router = express.Router();

router.post('/', createPlaceValidator(), createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.patch('/:pid', updatePlaceValidator(), updatePlaceByPlaceId);

router.delete('/:pid', deletePlaceByPlaceId);

export default router;
