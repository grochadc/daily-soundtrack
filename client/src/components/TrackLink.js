import React from 'react';
import { Link } from '@reach/router';
import { Panel, Media } from 'react-bootstrap';
import timeDiff from '../lib/utils';

function TrackLink(props){
  let { info } = props

  let arr = timeDiff(new Date('2018-06-11T00:27:57.134Z'));

  let timeStamp = arr[0]>1 ? arr[0]+' '+arr[1]+'s': arr[0]+' '+arr[1]

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
          Posted by: <Link to={'/playlist/'+props.user}>{props.user}</Link> <div className='small'>{ timeStamp } ago</div>
        </Panel.Footer>
      </Panel>
    </Link>
  )
}

export default TrackLink;
