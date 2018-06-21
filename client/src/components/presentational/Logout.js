import React from "react";

function Logout() {
  localStorage.removeItem("daily-soundtrack");
  return <h1>Logged out</h1>;
}

export default Logout;
