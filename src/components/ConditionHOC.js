import React from 'react';

export default function ConditionHOC(Component, props){
  if(props.condition){
    return <Component {... props}/>;
  } else {
    return null;
  }
}
