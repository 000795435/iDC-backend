const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const config = require('./config');

const movie_api = require('./router/movie_api');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', movie_api);

app.listen(config.default_port,
    () => console.log('Server is running.'));