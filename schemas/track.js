const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const trackSchema = new Schema({
  track_info: {
    title: String,
    artist: String,
    album: String
  },
  uri: String,
  date: Date,
  owner: ObjectId
})

module.exports = trackSchema;
