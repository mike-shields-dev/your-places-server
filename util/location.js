import axios from 'axios';
import { config } from 'dotenv';

import { HttpError } from '../models/http-error.js';

config();
const API_KEY = process.env.GOOGLE_GEO_API_KEY;

const coordinatesFromAddress = async (address) => {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    )
    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpError('Could not find location for provided address.', 422); 
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
};

export { coordinatesFromAddress };
