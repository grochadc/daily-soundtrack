import axios from "axios";
import { navigate } from "@reach/router";

async function getBackEnd(collection, method, query) {
  let url = "api/v1/" + collection + "?" + objectToURL(query);
  try {
    return await axios(url).data;
  } catch (err) {
    console.error(err);
  }
}

const objectToURL = obj =>
  Object.entries(obj)
    .map(([key, val]) => {
      let newVal = typeof val === "object" ? JSON.stringify(val) : val;
      return `${key}=${newVal}`;
    })
    .join("&");

function postTrack(track, message) {
  let { name, artists, album, uri } = track;
  let title = name;
  let artist = artists[0].name;
  let art = album.images[1].url;
  axios
    .post("api/v1/Track", {
      track_info: {
        art,
        artist,
        album: album.name,
        title
      },
      uri,
      date: new Date(),
      user: this.props.user,
      message
    })
    .then(response => {
      if (response.status === 201) {
        alert("Song submitted");
        navigate("/");
      }
    })
    .catch(err => console.log(err));
}

export { objectToURL, getBackEnd, postTrack };
