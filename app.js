const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
