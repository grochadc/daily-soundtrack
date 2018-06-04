const mongoose = require('mongoose');
const trackSchema = require('./schemas/track');
mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected!');
  let Track = mongoose.model('track', trackSchema);
  let newSong = new Track({
    track_info: {
      title: 'GOTTI',
      artist: '6ix9ine',
      album: 'Day69: Graduation Day'
    },
    uri: 'spotify:track:27oFpFktCq9JIXjJQRuv7a',
    date: Date()
  });
  newSong.save((err, song) => {
    console.log('track saved');
  })
})
