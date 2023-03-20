import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './places-data.json' assert { type: "json" };
import { v4 as uuid } from 'uuid';

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

    data.push(newPlace);

    res.status(201).json({ place: newPlace });
};

const getPlaceByPlaceId = (req, res, next) => {
    const place =
        data.find(({ id }) => id === req.params.pid);

    if (place) {
        return res.json(place);
    }
    
    next(new HttpError(errorMsg('place', 'place'), 404));
}

const getPlacesByUserId = (req, res, next) => {
    const places =
        data.filter(({ creator }) => creator === req.params.uid);

    if (places.length) {
        return res.json(places);
    }
    
    next(new HttpError(errorMsg('places', 'user'), 404));
}

const updatePlaceByPlaceId = (req, res, next) => {
    const { pid } = req.params;
    const { title, description } = req.body;
    const foundIndex = data.findIndex(({ id }) => id === pid)

    if (foundIndex < 0) {
        return next(new HttpError(errorMsg('place', 'place'), 404));    
    }

    data[foundIndex] = {
        ...data[foundIndex],
        title,
        description,
    };

    return res
        .status(200)
        .json({ place: data[foundIndex] });
};

const deletePlaceByPlaceId = (req, res, next) => {
    const { pid } = req.params;
    const place = data.find(place => place.id === pid)

    if (!place) {
        return next(new HttpError(errorMsg('place', 'place'), 404));
    }

    data = data.filter(place => place.id !== pid);

    return res.status(204);  
};

export {
    createPlace,
    getPlaceByPlaceId,
    getPlacesByUserId,
    updatePlaceByPlaceId, 
    deletePlaceByPlaceId,
};
