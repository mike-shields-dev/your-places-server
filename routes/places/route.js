import express from 'express';
import HttpError from '../../models/http-error.js';

const router = express.Router();

const PLACES = [
    {
        id: 'place0',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: 'user0',
    },
    {
        id: 'place1',
        title: 'Machu Picchu',
        description: 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views. Its exact former use remains a mystery.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Before_Machu_Picchu.jpg/1200px-Before_Machu_Picchu.jpg',
        address: 'Peru',
        location: {
            lat: -13.2263308,
            lng: -72.4995102,
        },
        creator: 'user1',
    },
];

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

router.get('/:pid', (req, res, next) => {
    const place =
        PLACES.find(({ id }) => id === req.params.pid);

    if (place) {
        return res.json(place);
    }
    
    next(new HttpError(errorMsg('place', 'place'), 404));
});

router.get('/user/:uid', (req, res, next) => {
    const places =
        PLACES.filter(({ creator }) => creator === req.params.uid);

    if (places.length) {
        return res.json(places);
    }
    
    next(new HttpError(errorMsg('place', 'user'), 404));
});


export default router;
