const express = require('express');
var helmet = require('helmet');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());
app.use(cors({
  origin: true
}));

//Rotas
const analysisRoute = require('./routes/analysisRoute');
const userRoute = require('./routes/userRoute');

app.use('/analysis', analysisRoute);
app.use('/user', userRoute);

module.exports = app;