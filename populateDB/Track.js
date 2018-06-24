const mongoose = require("mongoose");
const fs = require("fs");

const Track = mongoose.model("Track", require("../schemas/track"));

mongoose.connect("mongodb://localhost/test");
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  fs.readFile("./tracks.json", "utf8", (err, tracks) => {
    if (err) throw err;
    Track.insertMany(JSON.parse(tracks), (err, docs) => {
      console.log(docs);
      mongoose.connection.close();
    });
  });
});
