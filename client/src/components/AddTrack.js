import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import axios from 'axios';

class AddTrack extends Component {
  constructor(){
    super()
    this.state = {
      artist: '',
      title: '',
      album: '',
      uri: '',
      art: '',
      showSubmit: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleChange(event){
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    let { artist, album, title, uri, art} = this.state;
    console.log('Submit art ',art);

    axios.post('http://localhost:3030/api/v1/Track',{
      track_info: {
        art,
        artist,
        album,
        title
      },
      uri,
      date: new Date(),
    })
    .then((response) => {
      console.log(response);
      if(response.status===201){
        alert('Song submitted');
        window.location.href = '/'; //Couldn't understand how to redirect using reach router
      }
    })
    .catch((err) => console.log(err));
  }

  handleShow(){
    let that = this;
    let uri = this.state.uri;
    async function getToken(){
      let response = await axios.get('http://localhost:3030/token');
      let token = response.data.access_token;
      let trackAPI = await axios({
                              method: 'GET',
                              url: 'https://api.spotify.com/v1/tracks/'+uri.substr(uri.lastIndexOf(':')+1), //Strip the id from URI by finding the last :
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token
                              }
                            });
      let track = trackAPI.data;
      let art = track.album.images[1].url;
      let artist = track.artists[0].name;
      let title = track.name;
      let album = track.album.name;

      that.setState({
        art,
        artist,
        title,
        album,
        showSubmit: true
      });
    }
    getToken();
  }

  render(){
    let {artist, title, album, uri} = this.state;
    return (
      <Media>
        <Media.Body>
          <label>Artist: <input type="text" name="artist" value={artist} onChange={this.handleChange} /></label><br />
          <label>Song: <input type="text" name="title" value={title} onChange={this.handleChange} /></label><br />
          <label>Album: <input type="text" name="album" value={album} onChange={this.handleChange} /></label><br />
          <label>URI: <input type="text" name="uri" value={uri} onChange={this.handleChange} /></label><br />
          <button onClick={this.handleShow}> Show </button><br />
          { this.state.showSubmit ? <button onClick={this.handleSubmit}>Submit</button> : null}
        </Media.Body>
        <Media.Left>
          <img alt={'Album Art'} src={this.state.art} />
        </Media.Left>
      </Media>
      )
  }
}

export default AddTrack;
