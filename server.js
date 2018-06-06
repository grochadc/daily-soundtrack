require('dotenv').config();
var express = require('express');
var app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const router = express.Router()

const axios = require('axios');

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


let secret = process.env.SECRET;
console.log(secret ? 'Secret is good': 'No secret provided');
router.get('/token', (req, res) =>{
  axios({
    method: 'post',
    headers: {
      'Authorization': 'Basic '+secret
    },
    url: 'https://accounts.spotify.com/api/token',
    data: 'grant_type=client_credentials'
  })
  .then((response) => res.send(response.data))
  .catch((err) => res.send(err));
});

app.use(router);

let port = process.env.PORT || 3030
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
