const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const placesRoute = require('./routes/places');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/places', placesRoute);

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
