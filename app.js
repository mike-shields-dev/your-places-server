const PORT = process.env.PORT || 5000;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

import placesRoute from './routes/places/route.js';
import usersRoute from './routes/users/route.js';


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/places', placesRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
