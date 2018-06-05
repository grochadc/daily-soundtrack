import React from 'react';
import { Link } from '@reach/router';
import { Panel } from 'react-bootstrap';

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
      return parseInt(timeSeconds)+' seconds ago'
    }else if(timeMinutes < 60){
      return parseInt(timeMinutes)+' minutes ago';
    } else if(timeHours < 24){
      return parseInt(timeHours)+' hours ago';
    }
  }
  return(
    <Link to={'/player/'+props.id} style={{ textDecoration: 'none'}}>
      <Panel>
        <Panel.Body>
              <img alt={''} src={info.art} width="100" height="100"/><br />
              {info.title}<br />
              by {info.artist}
        </Panel.Body>
        <Panel.Footer>
          Posted by: medicengonzo { calculateTimestamp(props.timestamp) }
        </Panel.Footer>
      </Panel>
    </Link>
  )
}

export default TrackLink;
