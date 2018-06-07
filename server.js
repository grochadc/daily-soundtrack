require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const router = require('./routes/router');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');

app.use(bodyParser.json());
app.use(methodOverride());
//app.use(express.static(path.resolve(__dirname, 'client/build/')));

mongoose.connect('mongodb://localhost/test');
const trackSchema = require('./schemas/track');
const trackModel = mongoose.model('Track', trackSchema );

restify.serve(router, trackModel);

app.use(router);

let port = process.env.PORT || 3030
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
