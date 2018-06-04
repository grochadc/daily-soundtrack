var express = require('express');
var app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const router = express.Router()

const trackSchema = require('./schemas/track');

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/test');

restify.serve(router, mongoose.model('Track', trackSchema ));

app.use(router);

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
