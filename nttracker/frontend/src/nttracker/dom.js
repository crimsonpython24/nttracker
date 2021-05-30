import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";

import Home from "../../src/main/home";
import Login from "../../src/auth/login-dom";
import { NTTrackerContext } from './context';


const NTTracker = () => {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/accounts/login"><Login/></Route>
      </Switch>
    </>
  );
};

export default NTTracker;