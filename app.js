
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { HttpError } from './models/http-error.js';

import placesRoute from './routes/places/route.js';
import usersRoute from './routes/users/route.js';

config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/places', placesRoute);
app.use('/api/users', usersRoute);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route!', 404);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500)
        .json({
            message:
                error.message ||
                'An unknown error occurred!',
        });
});

app.listen(
    PORT,
    () => console.log(`App is listening on ${PORT}`)
);
