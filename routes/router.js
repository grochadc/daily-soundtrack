require('dotenv').config();
const router = require('express').Router();
const mongoose = require('mongoose');
const trackSchema = require('../schemas/track');
const axios = require('axios');

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

module.exports = router;
