import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './places-data.json' assert { type: "json" };
import HttpError from '../../models/http-error.js';

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


export { getPlaceByPlaceId, getPlacesByUserId };