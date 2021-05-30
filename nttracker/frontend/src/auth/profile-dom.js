import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import './login-dom.css';

import { useHistory } from "react-router-dom";
import { NTTrackerContext } from "../nttracker/context.js";
import { message } from "antd";

function Profile() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();

  if (state.user.authenticated)
    localStorage.setItem('ever_logged_in', true);

  const has_auth = localStorage.getItem('ever_logged_in');

  if (!has_auth) {
    console.log(has_auth);
    message.warning('Please log in to edit account', 3.55);
    history.push("/accounts/login");
  }
  
  return (
    <div style={{ padding: "30px" }}>
      <h2>Nothing here yet...</h2>
    </div>
  )
}

export default Profile;