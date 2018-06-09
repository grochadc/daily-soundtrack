import React from 'react';
function Profile(props){
  let loggedIn = props.user_info === null ? false : true;
  return (
    <div>
    {loggedIn ?
      <div>
      <div>Welcome, {props.user_info.display_name}!</div><br />
      <div>Username: {props.user_info.id}</div><br />
      <div>email: {props.user_info.email}</div><br />
      </div> :
      <div>Please Sign In</div>
    }
  </div>
  )
}

export default Profile;
