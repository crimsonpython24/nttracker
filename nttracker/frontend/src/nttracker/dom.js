import React, { useContext, useState } from 'react';

import { Button, ConfigProvider, Result, Space, Typography } from 'antd';
import 'antd/dist/antd.css';

import { useNProgress } from '@tanem/react-nprogress';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Login from '../../src/auth/login-dom';
import Profile from '../../src/auth/profile-dom';
import Footer from '../../src/common/footer';
import Navbar from '../../src/common/navbar';
import Home from '../../src/main/home';
import CreateEvent from '../api/createevent.js';
import APIHome from '../api/home.js';
import { NTTrackerContext } from '../nttracker/context.js';
import Bar from './bar';
import Container from './container';
import './dom.css';

const { Text, Title } = Typography;

const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

function NoMatch() {
  const pathname = (
    <Space direction='horizontal'>
      <Text type='secondary'>Sorry,</Text>
      <Text type='secondary' mark>
        {window.location.pathname}
      </Text>
      <Text type='secondary'>does not exist.</Text>
    </Space>
  );
  return (
    <>
      <Result
        className='item-no-select item-no-drag'
        status='404'
        title='404'
        subTitle={pathname}
        extra={
          <>
            <Link to='/' key='back-home'>
              <Button type='primary'>Back Home</Button>
            </Link>
            <a href='https://www.nitrotype.com'>
              <Button type='outlined'>Get me outta here</Button>
            </a>
          </>
        }
      />
      ,
    </>
  );
}

const NTTracker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(NTTrackerContext);

  return (
    <>
      <ConfigProvider locale={state.site.locale}>
        <Router>
          <Route
            render={({ location }) => (
              <>
                <Progress isAnimating={isLoading} key={location.key} />
                <Navbar />
                <TransitionGroup className='body-dom'>
                  <CSSTransition
                    classNames='fade'
                    key={location.key}
                    onEnter={() => {
                      setIsLoading(true);
                    }}
                    onEntered={() => {
                      setIsLoading(false);
                    }}
                    timeout={450}
                    in={true}
                  >
                    <Switch location={location}>
                      <Route exact path='/'>
                        <div style={{ paddingLeft: 23 }}>
                          <Title level={2}>index page, nothin' here</Title>
                          <br />
                          {state.user.available_teams.length != 0 ? (
                            <Title level={3}>Managable teams:</Title>
                          ) : (
                            <></>
                          )}
                          <ul>
                            {state.user.available_teams.map(team => (
                              <li key={team}>
                                <Link to={'/team/' + team}>
                                  {team.toString().toUpperCase()}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Route>
                      <Route exact path='/accounts/login'>
                        <Login />
                      </Route>
                      <Route exact path='/accounts/profile'>
                        <Profile />
                      </Route>
                      <Route exact path='/team/:teamname'>
                        <Home />
                      </Route>
                      <Route exact path='/team/:teamname/api'>
                        <APIHome />
                      </Route>
                      <Route exact path='/team/:teamname/create_event'>
                        <CreateEvent />
                      </Route>
                      <Route exact path='*' component={NoMatch} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
                <Footer />
              </>
            )}
          />
        </Router>
      </ConfigProvider>
    </>
  );
};

export default NTTracker;
