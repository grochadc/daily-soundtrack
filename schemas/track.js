const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  track_info: {
    title: String,
    artist: String,
    album: String,
    art: String
  },
  uri: String,
  date: Date,
  user: {
    id: String,
    name: String
  },
  message: String
});

module.exports = trackSchema;
