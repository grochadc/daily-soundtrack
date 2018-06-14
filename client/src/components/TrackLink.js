import React from 'react';
import { Link } from '@reach/router';
import { Panel, Media } from 'react-bootstrap';
import { distanceInWordsToNow } from 'date-fns';

function TrackLink(props){
  let { info } = props

  return(
      <Panel>
        <Panel.Body>
          <Link to={'/player/'+props.id} style={{ textDecoration: 'none'}}>
          <Media>
              <Media.Left><img alt={''} src={info.art} width="100" height="100"/></Media.Left>
              <Media.Body>
              <h3>{info.title}</h3>
              by {info.artist}
            </Media.Body>
          </Media>
          </Link>
        </Panel.Body>
        <Panel.Footer>
          Posted by: <Link to={'/playlist/'+props.user}>{props.user}</Link> <div className='small'>{distanceInWordsToNow(new Date(props.timestamp))} ago</div><br />
        </Panel.Footer>
      </Panel>
  )
}

export default TrackLink;
