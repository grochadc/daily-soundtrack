import React from 'react';
function Profile(props){
  let { display_name, id, email } = props.user_info;
  return (
    <div>
    <div>Welcome, {display_name}!</div><br />
    <div>Username: {id}</div><br />
    <div>email: {email}</div><br />
    </div>
  )
}

export default Profile;
