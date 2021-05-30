import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";

import Home from "../../src/main/home";
import { NTTrackerContextProvider } from './context';


const NTTracker = () => {
  const [state, dispatch] = useContext(VmunContext);
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