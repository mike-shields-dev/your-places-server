import { validationResult } from 'express-validator';
import { startSession } from 'mongoose';

import Place from '../../models/place.js';
import User from '../../models/user.js';

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

    let user;

    try {
        user = await User.findById(creator);

    } catch (error) {

        return next(new HttpError(
            errorMsg('user', 'user'),
            500
        ));  
    }

    if(!user) {

        return next(new HttpError(
            errorMsg('user', 'user'), 
            404
        ));
    }

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
        const session = await startSession();

        session.startTransaction();

            await newPlace.save({session});
            user.places.push(newPlace)
            await user.updateOne({
                places: user.places,
            },
            {session});
        
        await session.commitTransaction();

    } catch (err) {

        return next(
            new HttpError('Failed to save place, please try again.', 500)
        );
    }

    res.status(201).json({ place: newPlace.toObject({ getters: true })});
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
        return res.json(places.map(place => 
            place.toObject({ getters: true })
        ));
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
        place = await Place.findById(pid).populate('creator');

    } catch (error) {
        return (next(new HttpError(
            'Something went wrong, please try again later.',
            500,
        )));        
    }

    if (!place) {
        return (next(new HttpError(
            errorMsg('place', 'place'),
            404
        )));
    }

    try {
        const session = await startSession();
        
            session.startTransaction()            
            await Place.deleteOne({ _id: pid }, { session });
            place.creator.places.pull(place);
            await place.creator.updateOne({
                places: place.creator.places,
            });

        await session.commitTransaction();

    } catch (error) {
        console.log(error)
        return (next(new HttpError(
            'Something went wrong, please try again later.',
            404,
        )));   
    }

    return res
        .status(200)
        .json({ message: 'Place deleted.' });
};

export {
    createPlace,
    getPlaceByPlaceId,
    getPlacesByUserId,
    updatePlaceByPlaceId,
    deletePlaceByPlaceId,
};
