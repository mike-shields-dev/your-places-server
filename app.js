const PORT = process.env.PORT || 5000;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import placesRoute from './routes/places/route.js';
import usersRoute from './routes/users/route.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/places', placesRoute);
app.use('/api/users', usersRoute);

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
