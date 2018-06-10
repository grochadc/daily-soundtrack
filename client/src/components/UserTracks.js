import React, { Component } from 'react';
import Loading from './Loading';
import TrackLink from './TrackLink';
import axios from 'axios';
import { Grid, Row, PageHeader } from 'react-bootstrap';

class UserTracks extends Component {
  constructor() {
    super()
    this.state = {
      tracks: null
    }
  }
  componentDidMount() {
    let { user } = this.props;
    let query = { user };
    axios({
      url: 'http://localhost:3030/api/v1/Track?query='+JSON.stringify(query),
      method: 'get',
    })
    .then((response) => {
      let tracks = response.data;
      this.setState({
        tracks
      });
    })
    .catch((err) => console.error(err));
  }
  render() {
    return (
      <Grid>
        <PageHeader>{this.props.user}'s Playlist</PageHeader>
        <Row>
        {this.state.tracks===null ?
          <Loading />:
          this.state.tracks.map((track, i) => <TrackLink id={track._id} info={track.track_info} timestamp={track.date} user={track.user} key={i} />)
        }
      </Row>
      </Grid>
    );
  }
}

export default UserTracks;