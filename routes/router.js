require('dotenv').config();
const router = require('express').Router();
const mongoose = require('mongoose');
const trackSchema = require('../schemas/track');
const axios = require('axios');
const queryString = require('query-string');
const request = require('superagent');

const trackModel = mongoose.model('Track', trackSchema );

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

const redirect_uri = 'http://localhost:3030/callback';
const client_id = process.env.CLIENT_ID;
router.get('/login', (req, res) => {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

router.get('/callback', (req, res) => {
  let data = queryString.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri
  });

  request
    .post('https://accounts.spotify.com/api/token')
    .send(data)
    .set('Authorization', 'Basic '+secret)
    .end((err, response) => {
      if(err) res.send(err);
      else res.redirect('http://localhost:3000/success/'+response.text);
    })
});

module.exports = router;
