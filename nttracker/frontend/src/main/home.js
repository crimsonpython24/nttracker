import React, { useContext } from 'react';

import "antd/dist/antd.css";

import { Redirect } from "react-router-dom";
import { NTTrackerContext } from '../nttracker/context';

function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);

  return (
    <>
      <h1>Nothing here yet...</h1>
    </>
  )
}

export default Home;