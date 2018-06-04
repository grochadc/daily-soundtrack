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

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb://localhost/test');

restify.serve(router, mongoose.model('Track', trackSchema ));

app.use(router);

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
