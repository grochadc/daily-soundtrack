import React from 'react';

function Logout(){
  localStorage.removeItem('jwt');
  return (
    <h1>Logged out</h1>
  )
}

export default Logout;
