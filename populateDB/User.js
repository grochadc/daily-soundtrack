const mongoose = require("mongoose");
const fs = require("fs");

const User = mongoose.model("User", require("../schemas/User"));

mongoose.connect("mongodb://localhost/test");
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  fs.readFile("./users.json", "utf8", (err, users) => {
    if (err) throw err;
    User.insertMany(JSON.parse(users), (err, docs) => {
      console.log(docs);
      mongoose.connection.close();
    });
  });
});
