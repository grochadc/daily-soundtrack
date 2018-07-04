import * as SpotifyWebApi from "spotify-web-api-js";
import Q from "q";

let spotify = new SpotifyWebApi();
spotify.setPromiseImplementation(Q);

export default spotify;
