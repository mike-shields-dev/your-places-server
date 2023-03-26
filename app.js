import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { HttpError } from './models/http-error.js';

import placesRoute from './routes/places/route.js';
import usersRoute from './routes/users/route.js';

config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/places', placesRoute);
app.use('/api/users', usersRoute);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route!', 404);
});

app.use((error, req, res, next) => {
    if(req.file) {
        fs.unlink(req.file.path, (error) => {
            if(error) {
                console.trace(error);
            }
        });
    }
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

const USER = process.env.MONGODB_USER
const PASSWORD = process.env.MONGODB_PASSWORD

mongoose
    .connect("mongodb+srv://cluster0.n5gfflr.mongodb.net/places?retryWrites=true&w=majority", {
        user: USER,
        pass: PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        app.listen(
            PORT, () => console.trace(`App is listening on ${PORT}`)
        )
    )
    .catch(err => console.trace(err));
