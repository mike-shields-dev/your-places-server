const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
