const router = require('express').Router();

const mongoose = require('mongoose');
const trackSchema = require('../schemas/track');
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;

let Track = mongoose.model('track', trackSchema);

router.get('/tracks', function (req, res) {
  let { id } = req.query;
  if(id){
    res.send(id);
  } else{
    Track.find({}, (err, tracks) => {
      if(err) console.log(err);
      res.send(tracks);
    });
  }
});

router.post('/tracks', (req, res) => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    console.log('Connected!');
    let Track = mongoose.model('track', trackSchema);
    let newSong = new Track(req.body);
    newSong.save((err, song) => {
      console.log('track saved');
    })
  })
  console.log(req.body);
  res.send(req.body)
});

module.exports = router;
