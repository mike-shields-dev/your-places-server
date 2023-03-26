import express from 'express';

import { validateCreatePlace, validateUpdatePlace } from '../../validators/places/validators.js';
import {
    createPlace, 
    getPlaceByPlaceId,
    getPlacesByUserId, 
    updatePlaceByPlaceId,
    deletePlaceByPlaceId, 
} from '../../controllers/places/controller.js';

import { fileUpload } from '../../middleware/file-upload.js';

const router = express.Router();

router.post('/', fileUpload.single('image'), validateCreatePlace(), createPlace);

router.get('/:pid', getPlaceByPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.patch('/:pid', validateUpdatePlace(), updatePlaceByPlaceId);

router.delete('/:pid', deletePlaceByPlaceId);

export default router;
