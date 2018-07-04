import * as SpotifyWebApi from "spotify-web-api-js";
import Q from "q";
import axios from "axios";

let spotify = new SpotifyWebApi();
spotify.setPromiseImplementation(Q);

export default spotify;
