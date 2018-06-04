import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class Player extends Component {
  constructor(){
    super();
    this.state = {
      track: null
    }
  }
  componentDidMount(){
    let that = this;
    axios.get('https://www.jsonstore.io/6b454a4b29261d56435c6854b86cfefa5c7089e6194cda7b19d580bda7c427e2/users/medicengonzo/tracks/'+this.props.match.params.track)
    .then(function (response) {
      let { result } = response.data
      let track = result.substr(result.lastIndexOf(':')+1);
      that.setState({track: result});
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    let URL = 'https://open.spotify.com/embed/track/'+this.state.track;
    return(
      <div className='player'>
        <Link to={'/playlist/'+(this.props.match.params.track-1)}>Prev</Link><br />
        <iframe src={URL} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title='currentTrack'></iframe>
      </div>
    )
  }
}
