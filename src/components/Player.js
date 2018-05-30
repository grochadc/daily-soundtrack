import React, { Component } from 'react';
import axios from 'axios';


export default class Player extends Component {
  constructor(){
    super();
    this.state = {
      track: null
    }
  }
  componentDidMount(){
    let that = this;
    axios.get('https://www.jsonstore.io/6b454a4b29261d56435c6854b86cfefa5c7089e6194cda7b19d580bda7c427e2/users/medicengonzo/tracks/'+this.props.trackNo)
    .then(function (response) {
      let { result } = response.data
      that.setState({track: result});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    let URL = 'https://open.spotify.com/embed/track/'+this.state.track;
    return <iframe src={URL} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title='currentTrack'></iframe>
  }
}
