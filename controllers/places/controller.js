import { validationResult } from 'express-validator';
import Place from '../../models/place.js';

import { errorMsg, HttpError } from '../../models/http-error.js';
import { coordinatesFromAddress } from '../../util/location.js';

import data from './places-data.json' assert { type: "json" };

let places = data;

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

const getPlacesByUserId = (req, res, next) => {
    const usersPlaces = 
        places.filter(({ creator }) => creator === req.params.uid);

    if (usersPlaces.length > 0) {
        return res.json(usersPlaces);
    }

    next(new HttpError(errorMsg('places', 'user'), 404));
}

const updatePlaceByPlaceId = (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {

        return res.status(422).json({
            message: 'Invalid data provided.',
            details:
                errors.map(({ param, msg }) => `${param} ${msg}`),
        });
    }

    const { pid } = req.params;
    const { title, description } = req.body;
    const foundIndex = places.findIndex(({ id }) => id === pid)

    if (foundIndex < 0) {
        return next(new HttpError(errorMsg('place', 'place'), 404));
    }

    places[foundIndex] = {
        ...places[foundIndex],
        title,
        description,
    };

    return res
        .status(200)
        .json({ place: places[foundIndex] });
};

const deletePlaceByPlaceId = (req, res, next) => {
    const { pid } = req.params;

    const foundPlace = places.find(({ id }) => id === pid)

    if (!foundPlace) {
        return next(new HttpError(errorMsg('place', 'place'), 404));
    }

    places = places.filter(({ id }) => id !== pid);

    return res.sendStatus(204);
};

export {
    createPlace,
    getPlaceByPlaceId,
    getPlacesByUserId,
    updatePlaceByPlaceId,
    deletePlaceByPlaceId,
};
