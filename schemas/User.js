const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  following: Array,
  spotify_info: {
    country: {
      type: "String"
    },
    display_name: {
      type: "String"
    },
    external_urls: {
      spotify: {
        type: "String"
      }
    },
    followers: {
      href: {
        type: "Mixed"
      },
      total: {
        type: "Number"
      }
    },
    href: {
      type: "String"
    },
    id: {
      type: "String"
    },
    images: {
      type: ["Mixed"]
    },
    product: {
      type: "String"
    },
    type: {
      type: "String"
    },
    uri: {
      type: "String"
    }
  }
});

module.exports = userSchema;
