import data from './places-data.json' assert { type: "json" };
import HttpError from '../../models/http-error.js';

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

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
    
    next(new HttpError(errorMsg('place', 'user'), 404));
}

export { getPlaceByPlaceId, getPlacesByUserId };