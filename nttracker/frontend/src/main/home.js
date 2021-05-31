import React, { useContext } from 'react';

import "antd/dist/antd.css";

import { NTTrackerContext } from '../nttracker/context';


function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);

  if (state.user.authenticated) {
    return (
      <div style={{ marginLeft: 30 }}>
        <h1>Teams here</h1>
      </div>
    )
  } else {
    return (
      <div style={{ marginLeft: 30 }}>
        <h1>You shouldn't be here...</h1>
        <h3>Had your team mod give you the wrong link? Anyways, nothing for you to see before the snake awakens.</h3>
      </div>
    )
  }
}


export default Home;
