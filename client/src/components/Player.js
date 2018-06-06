import React, { Component } from 'react';
import axios from 'axios';
import Loading  from './Loading';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class Player extends Component {
  constructor(){
    super();
    this.state = {
      track: null,
      trackBefore: null,
      trackAfter: null
    }
  }
  componentDidMount(){
    let that = this;
    let query = {
      _id: this.props.id
    }
    axios.get('http://localhost:3030/api/v1/Track?query='+JSON.stringify(query),{
      headers: {
        'Content-type': 'application-json'
      }
    })
    .then(function (response) {
      let { uri } = response.data[0]

      let track = uri.substr(uri.lastIndexOf(':')+1);
      that.setState({track: track});
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:3030/api/v1/Track/around/'+this.props.id)
    .then((response) => {
      let docs = response.data;
      that.setState({
        trackBefore: docs[0][0],
        trackAfter: docs[1][0]
      })
    })
    .catch((err) => console.log(err));
  }
  render(){
    let URL = 'https://open.spotify.com/embed/track/'+this.state.track;
    return(

      <Grid>
        <Row>
          <Col sm={7} smOffset={2}>
                {this.state.trackBefore ? <Button><a href={'/player/'+this.state.trackBefore._id}>Before</a></Button> : null}
                {this.state.trackAfter ? <Button className="pull-right"><a href={'/player/'+this.state.trackAfter._id}>After</a></Button> : null}
          </Col>
      </Row>
      <Row>
        <Col sm={5} smOffset={3}>
        {this.state.track===null ?
          <Loading /> :
          <iframe src={URL} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title='currentTrack'></iframe>}
        </Col>
      </Row>
      </Grid>
    )
  }
}
