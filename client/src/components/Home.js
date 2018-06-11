import React, { Component } from 'react';
import Loading from './Loading';
import TrackLink from './TrackLink';
import axios from 'axios';
import { Row, Grid } from 'react-bootstrap';

class Home extends Component {
  constructor(){
    super()
    this.state = {
      tracks: null
    }
  }
  componentDidMount(){
    let that = this;
    axios.get('/api/v1/Track?sort={"date":-1}',
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      let { data } = response
      that.setState({
        tracks: data
      })
    })
    .catch((error) => console.log(error));
  }
  render(){
    return(
      <Grid>
        <Row>
        {this.state.tracks===null ?
          <Loading />:
          this.state.tracks.map((track, i) => <TrackLink id={track._id} info={track.track_info} timestamp={track.date} user={track.user} key={i} />)
        }
      </Row>
      </Grid>
    )
  }
}

export default Home;
