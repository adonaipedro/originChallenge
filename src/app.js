const express = require('express');
var helmet = require('helmet');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true
}));

//Rotas
const analysisRoute = require('./routes/analysisRoute');

app.use('/analysis', analysisRoute);

module.exports = app;