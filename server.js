require('dotenv').config();
const path = require('path');
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
const trackModel = mongoose.model('Track', trackSchema );

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.resolve(__dirname, 'client/build/')));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect('mongodb://localhost/test');

restify.serve(router, trackModel);

router.get('/api/v1/Track/around/:id',(req, res) => {
  async function findTracks(){
    let beforeDocs = await trackModel.find({'_id':{'$lt':req.params.id}}).sort({'_id':-1}).limit(1)
    let afterDocs = await trackModel.find({'_id':{'$gt':req.params.id}}).sort('_id').limit(1)

    res.send([beforeDocs.length ? beforeDocs : null , afterDocs.length ? afterDocs : null]);
  }
  findTracks();
});

let secret = process.env.SECRET;
console.log(secret ? 'Secret is good': 'No secret provided');
router.get('/token', (req, res) => {
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
