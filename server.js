require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const router = require("./routes/router");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const restify = require("express-restify-mongoose");

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect(
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://localhost/test"
);

const trackSchema = require("./schemas/track");
const trackModel = mongoose.model("Track", trackSchema);
restify.serve(router, trackModel);

const userSchema = require("./schemas/User");
const userModel = mongoose.model("User", userSchema);
restify.serve(router, userModel);

app.use(router);

if (process.env.NODE_ENV === "production") {
  console.log("Serving production files");
  app.get("/hello", (req, res) => {
    res.send("World");
  });
  app.use(express.static(path.resolve(__dirname, "client/build/")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 3030;
app.listen(port, function() {
  console.log("Example app listening on port " + port + "!");
  console.log("Node enviroment", process.env.NODE_ENV);
});
