import React from 'react';
import { Link } from '@reach/router';

function TrackLink(props){
  let { info } = props
  return(
    <Link to={'/player/'+props.id}>
    {info.title} by {info.artist}
    </Link>
  )
}

export default TrackLink;
