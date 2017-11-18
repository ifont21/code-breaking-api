const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./../api/routers/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

module.exports = app;


