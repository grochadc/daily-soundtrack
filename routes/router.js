require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const trackSchema = require("../schemas/track");
const userSchema = require("../schemas/User");
const axios = require("axios");
const queryString = require("query-string");
const request = require("superagent");

const trackModel = mongoose.model("Track", trackSchema);

router.get("/api/v1/Track/around/:id", (req, res) => {
  async function findTracks() {
    let beforeDocs = await trackModel
      .find({ _id: { $lt: req.params.id } })
      .sort({ _id: -1 })
      .limit(1);
    let afterDocs = await trackModel
      .find({ _id: { $gt: req.params.id } })
      .sort("_id")
      .limit(1);

    res.send([
      beforeDocs.length ? beforeDocs : null,
      afterDocs.length ? afterDocs : null
    ]);
  }
  findTracks();
});

let secret = process.env.SECRET;
console.log(secret ? "Secret is good" : "No secret provided");

let SPOTIFY_TOKEN;

router.get("/token", (req, res) => {
  console.log("Client requested token");
  if (SPOTIFY_TOKEN) {
    if ((new Date() - SPOTIFY_TOKEN.createdAt) / 1000 >= 3600) {
      console.log("Token expired, getting a new one");
      getSpotifyToken();
    } else {
      console.log("Token hasn't expired");
      res.send({
        ...SPOTIFY_TOKEN,
        trueExpiresIn: 3.6e6 - (new Date() - SPOTIFY_TOKEN.createdAt)
      });
    }
  } else {
    getSpotifyToken();
  }

  function getSpotifyToken() {
    axios({
      method: "post",
      headers: {
        Authorization: "Basic " + secret
      },
      url: "https://accounts.spotify.com/api/token",
      data: "grant_type=client_credentials"
    })
      .then(({ data }) => {
        SPOTIFY_TOKEN = {
          ...data,
          createdAt: new Date()
        };
        res.send(data);
      })
      .catch(err => res.send(err));
  }
});

const redirect_uri = "http://localhost:3030/callback";
const client_id = process.env.CLIENT_ID;

router.get("/login", (req, res) => {
  var scopes = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri)
  );
});

router.get("/callback", (req, res) => {
  let data = queryString.stringify({
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri
  });

  let success_url =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000/success/"
      : "http://localhost:3030/success/";
  request
    .post("https://accounts.spotify.com/api/token")
    .send(data)
    .set("Authorization", "Basic " + secret)
    .end((err, response) => {
      if (err) res.send(err);
      else {
        let { access_token } = JSON.parse(response.text);
        axios({
          url: "https://api.spotify.com/v1/me",
          headers: {
            Authorization: "Bearer " + access_token
          }
        })
          .then(({ data }) => {
            userModel
              .find({ "spotify_info.id": data.id })
              .then(result => {
                if (result.length === 0) {
                  userModel.create(
                    {
                      spotify_info: data,
                      following: []
                    },
                    (err, doc) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Sending new doc ", doc);
                        res.redirect(
                          success_url + encodeURIComponent(JSON.stringify(doc))
                        );
                      }
                    }
                  );
                } else {
                  let newResult = result[0];
                  res.redirect(
                    success_url + encodeURIComponent(JSON.stringify(newResult))
                  );
                }
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
    });
});

const userModel = mongoose.model("User", userSchema);

/*
body:

{
'folow': 'usernameToFollow',
'currentUser': {
  '_id': '5b2ec0a0f1f7c723dd01fb52'
  (OR)
  'username': 'currentUserName'
  }
}
*/
router.post("/follow", (req, res) => {
  console.log("Posting to /follow endpoint");
  let query;
  let { follow, currentUser } = req.body;
  if (currentUser._id) {
    console.log("requested with _id");
    query = {
      _id: currentUser._id
    };
  } else if (currentUser.username) {
    console.log("requested with username");
    query = {
      "spotify_info.id": currentUser.username
    };
  }
  userModel.update(query, { $addToSet: { following: follow } }, (err, doc) => {
    res.status(201).send("User updated!");
  });
});

router.post("/unfollow", (req, res) => {
  console.log("Posting to /unfollow endpoint");
  let query;
  let { unfollow, currentUser } = req.body;
  if (currentUser._id) {
    console.log("requested with _id");
    query = {
      _id: currentUser._id
    };
  } else if (currentUser.username) {
    console.log("requested with username");
    query = {
      "spotify_info.id": currentUser.username
    };
  }
  console.log("Query: ", query);
  userModel.update(query, { $pull: { following: unfollow } }, (err, doc) => {
    res.status(201).send("User updated!");
  });
});

module.exports = router;
