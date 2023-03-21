import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

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

    const newPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };

    places.push(newPlace);

    res.status(201).json({ place: newPlace });
};

const getPlaceByPlaceId = (req, res, next) => {
    const place =
        places.find(({ id }) => id === req.params.pid);

    if (place) {
        return res.json(place);
    }
    
    next(new HttpError(errorMsg('place', 'place'), 404));
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

