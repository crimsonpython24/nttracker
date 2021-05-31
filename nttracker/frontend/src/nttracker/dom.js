import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";

import Home from "../../src/main/home";
import Login from "../../src/auth/login-dom";
import Navbar from "../../src/common/navbar";
import Profile from "../../src/auth/profile-dom";
import { NTTrackerContext } from './context';


const NTTracker = () => {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/accounts/login"><Login/></Route>
        <Route path="/accounts/profile"><Profile/></Route>
      </Switch>
    </>
  );
};


export default NTTracker;
