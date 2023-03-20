import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './places-data.json' assert { type: "json" };
import { v4 as uuid } from 'uuid';

let places = data;

const createPlace = (req, res, next) => {
    const {
        title,
        description, 
        coordinates, 
        address, 
        creator, 
    } = req.body;

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
