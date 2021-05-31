import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useNProgress } from "@tanem/react-nprogress"

import Home from "../../src/main/home";
import Login from "../../src/auth/login-dom";
import Navbar from "../../src/common/navbar";
import Profile from "../../src/auth/profile-dom";
import Bar from "./bar";
import Container from "./container";
import "./dom.css";


const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({isAnimating});

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  )
}


const NTTracker = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Router>
        <Route
          render={({ location }) => (
            <>
              <Progress isAnimating={isLoading} key={location.key} />
              <Navbar/>
              <TransitionGroup>
                <CSSTransition
                  classNames="fade"
                  key={location.key}
                  onEnter={() => {setIsLoading(true)}}
                  onEntered={() => {setIsLoading(false)}}
                  timeout={450}
                  in={true}
                >
                  <Switch location={location}>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/accounts/login"><Login/></Route>
                    <Route path="/accounts/profile"><Profile/></Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </>
          )}
        />
      </Router>
    </>
  );
};


export default NTTracker;
