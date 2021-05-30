import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import './login-dom.css';

import { useHistory } from "react-router-dom";
import { NTTrackerContext } from "../nttracker/context.js";

function Profile() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();

//   if (!state.user.is_authenticated) {
//     history.push("/accounts/login");
//   }
  
  return (
    <div style={{ padding: "30px" }}>
      <h2>Nothing here yet...</h2>
    </div>
  )
}

export default Profile;