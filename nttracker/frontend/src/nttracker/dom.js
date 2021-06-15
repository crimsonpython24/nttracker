import React, { useState, useContext } from "react";

import "antd/dist/antd.css";
import { ConfigProvider, Result, Button, Typography, Space } from 'antd';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useNProgress } from "@tanem/react-nprogress"

import Home from "../../src/main/home";
import Login from "../../src/auth/login-dom";
import Navbar from "../../src/common/navbar";
import Footer from "../../src/common/footer";
import Profile from "../../src/auth/profile-dom";
import APIHome from "../api/home.js";
import Bar from "./bar";
import Container from "./container";
import "./dom.css";
import { NTTrackerContext } from "../nttracker/context.js";


const { Text } = Typography;


const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({isAnimating});

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  )
}


function NoMatch() {
  const pathname = (
    <Space direction="horizontal">
      <Text type="secondary">Sorry,</Text>
      <Text type="secondary" mark>{window.location.pathname}</Text>
      <Text type="secondary">does not exist.</Text>
    </Space>
  );
  return (
    <>
      <Result
        className="item-no-select item-no-drag"
        status="404"
        title="404"
        subTitle={pathname}
        extra={
          <>
            <Link to="/" key="back-home">
              <Button type="primary">Back Home</Button>
            </Link>
            <a href="https://www.nitrotype.com">
              <Button type="outlined">Get me outta here</Button>
            </a>
          </>  
        }
      />,
    </>
  )
}


const NTTracker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(NTTrackerContext);

  return (
    <>
      <ConfigProvider locale={state.site.locale}>
        <Router>
          <Route
            render={() => (
              <>
                <Progress isAnimating={isLoading}  />
                <Navbar/>
                <TransitionGroup className="body-dom">
                  <CSSTransition
                    classNames="fade"
                    onEnter={() => {setIsLoading(true)}}
                    onEntered={() => {setIsLoading(false)}}
                    timeout={450}
                    in={true}
                  >
                    <Switch>
                      <Route exact path="/">
                        <div  style={{ paddingLeft: 23 }}>
                          <h1>index page, nothin' here</h1>
                          <br/>
                          <h2>Managable teams:</h2>
                          <ul>
                            {(state.user.available_teams).map((team) => (
                              <li>
                                <Link to={"/team/" + team}>
                                  {team.toString().toUpperCase()}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Route>
                      <Route exact path="/team/:teamname"><Home/></Route>
                      <Route exact path="/accounts/login"><Login/></Route>
                      <Route exact path="/accounts/profile"><Profile/></Route>
                      <Route exact path="/api/:teamname"><APIHome/></Route>
                      <Route exact path="*" component={NoMatch} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
                <Footer/>
              </>
            )}
          />
        </Router>
      </ConfigProvider>
    </>
  );
};


export default NTTracker;
