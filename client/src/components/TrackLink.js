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
      let msg = timeSeconds>1 ? ' seconds ago' : ' second ago'
      return parseInt(timeSeconds, 10)+msg;
    }else if(timeMinutes < 60){
      let msg = timeMinutes>1 ? ' minutess ago' : ' minute ago'
      return parseInt(timeMinutes, 10)+msg;
    } else if(timeHours < 24){
      let msg = timeSeconds>1 ? ' hours ago' : ' hour ago'
      return parseInt(timeHours, 10)+msg;
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
          Posted by: {props.user} <div className='small'>{ calculateTimestamp(props.timestamp) }</div>
        </Panel.Footer>
      </Panel>
    </Link>
  )
}

export default TrackLink;
