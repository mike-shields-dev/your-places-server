import { validationResult } from 'express-validator';
import Place from '../../models/place.js';

import { errorMsg, HttpError } from '../../models/http-error.js';
import { coordinatesFromAddress } from '../../util/location.js';

const createPlace = async (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {

        return res.status(422).json({
            message: 'Invalid data provided.',
            details:
                errors.map(({ param, msg }) => `${param} ${msg}`),
        });
    }

    const {
        title,
        description,
        address,
        creator,
    } = req.body;

    let coordinates;

    try {
        coordinates = await coordinatesFromAddress(address);
    } catch (error) {
        return next(error);
    }

    const newPlace = new Place({
        title,
        description,
        location: coordinates,
        creator,
        address,
        image: 'https://placehold.co/400',
    });

    try {

        await newPlace.save();
    
    } catch (err) {
        
        return next(
            new HttpError('Failed to save place, please try again.', 500)
        );
    }

    res.status(201).json({ place: newPlace });
};

const getPlaceByPlaceId = async (req, res, next) => {
    let place;
    
    try {
        place = await Place.findById(
            req.params.pid
        );
            
    } catch (err) {
        return next(
            new HttpError(
                'Something went wrong with the database query.',
                500
            )
        );
    }
    
    if (!place) {
        return next(
            new HttpError(
                errorMsg('place', 'place'),
                404
            )
        );
    }

    return res.json({
        place: place.toObject({ getters: true })
    });
}

const getPlacesByUserId = async (req, res, next) => {
    let places;

    try {
        places = await Place.find({
            creator: req.params.uid
        });

    } catch (err) {
        return next(
            new HttpError(
                'Something went wrong, please try again later.',
                500
            )   
        );
    }

    if (places?.length > 0) {
        return res.json(places.map(place => place.toObject({ getters: true })));
    }

    next(new HttpError(errorMsg('places', 'user'), 404));
}

const updatePlaceByPlaceId = async (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {

        return res.status(422).json({
            message: 'Invalid data provided.',
            details:
                errors.map(({ param, msg }) => `${param} ${msg}`),
        });
    }

    const { title, description } = req.body;
    let place;

    try {
        place = await Place.findById(req.params.pid);

    } catch (err) {
        return next(new HttpError(
            'Something went wrong, please try again later.',
            500
        ));
    }

    if (!place) {
        return next(new HttpError(
            errorMsg('place', 'place'),
            404
        ));
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();

    } catch (err) {
        return next(new HttpError(
            'Something went wrong. Please try again later.',
            500
        ));
    }

    return res
        .status(200)
        .json({ place: place.toObject({ getters: true })});
};

const deletePlaceByPlaceId = async (req, res, next) => {
    const { pid } = req.params;

    let place;

    try {
        place = await Place.findById(pid);

    } catch (error) {
        return (next(new HttpError(
            'Something went wrong, please try again later.',
            404,
        )));        
    }

    if (!place) {
        return (next(new HttpError(
            errorMsg('place', 'place'),
            404
        )));
    }

    try {
        await Place.deleteOne({ id: place.id });

    } catch (error) {
        return (next(new HttpError(
            'Something went wrong, please try again later.',
            404,
        )));   
    }

    return res
        .status(200)
        .json({ message: 'Place deleted' });
};

export {
    createPlace,
    getPlaceByPlaceId,
    getPlacesByUserId,
    updatePlaceByPlaceId,
    deletePlaceByPlaceId,
};
