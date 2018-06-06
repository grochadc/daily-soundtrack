import React from 'react';
import { Link } from '@reach/router';
import { Panel, Media } from 'react-bootstrap';

function TrackLink(props){
  let { info } = props
  function calculateTimestamp(time){
    let now = new Date();
    let timestamp = new Date(time);
    let timeDiff = (now - timestamp)
    let timeSeconds = (timeDiff/1000);
    let timeMinutes = (timeSeconds/60);
    let timeHours = (timeMinutes/60);

    if(timeSeconds < 60){
      return parseInt(timeSeconds, 10)+' seconds ago'
    }else if(timeMinutes < 60){
      return parseInt(timeMinutes, 10)+' minutes ago';
    } else if(timeHours < 24){
      return parseInt(timeHours, 10)+' hours ago';
    }
  }
  return(
    <Link to={'/player/'+props.id} style={{ textDecoration: 'none'}}>
      <Panel>
        <Panel.Body>
          <Media>
              <Media.Left><img alt={''} src={info.art} width="100" height="100"/></Media.Left>
              <Media.Body>
              <h3>{info.title}</h3>
              by {info.artist}
            </Media.Body>
          </Media>
        </Panel.Body>
        <Panel.Footer>
          Posted by: medicengonzo { calculateTimestamp(props.timestamp) }
        </Panel.Footer>
      </Panel>
    </Link>
  )
}

export default TrackLink;
