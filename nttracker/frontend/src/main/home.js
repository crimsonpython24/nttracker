import React, { useContext, useEffect } from 'react';

import { Button, Card, Col, Row, Space, Typography, message } from 'antd';
import 'antd/dist/antd.css';

import { Link, useHistory, useParams } from 'react-router-dom';

import { NTTrackerContext } from '../nttracker/context';
import './home.css';

const { Title } = Typography;

function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const { teamname } = useParams();
  const history = useHistory();
  let teamid;

  //////////////////////////
  // Part 4: Handle Login //
  //////////////////////////
  function checklogin(callback) {
    if (!state.user.authenticated)
      pushhistory('/accounts/login', function () {
        teamhome2_message();
      });
    else callback();
  }

  let has_group_auth = false;
  function checkauth(callback) {
    state.user.available_teams.forEach(function (currentValue) {
      if (
        currentValue.toString().toLowerCase() ===
        teamname.toString().toLowerCase()
      ) {
        has_group_auth = true;
      }
    });
    if (!has_group_auth) {
      if (state.user.available_teams.length != 0)
        pushhistory('/team/' + state.user.available_teams[0], function () {
          teamhome3_message();
        });
      else
        pushhistory('/', function () {
          apihome3_message();
        });
    } else {
      callback();
    }
  }

  /////////////////////
  // Part 5: Message //
  /////////////////////
  function teamhome1_message() {
    const info = message.warning({
      key: 'apihome1',
      content: 'Team ' + teamname + ' not found!',
      duration: 5.35,
      onClick: () => {
        info('apihome1');
      },
      className: 'item-no-select',
    });
  }
  function teamhome2_message() {
    const info = message.error({
      key: 'apihome2',
      content: 'Log in to access team data!',
      duration: 5.35,
      onClick: () => {
        info('apihome2');
      },
      className: 'item-no-select',
    });
  }
  function teamhome3_message() {
    const info = message.warning({
      key: 'teamhome3',
      content: 'You do not have access to this team admin!',
      duration: 5.35,
      onClick: () => {
        info('apihome3');
      },
      className: 'item-no-select',
    });
  }

  /////////////////////////
  // Part 7: Redirection //
  /////////////////////////
  function pushhistory(url, callback) {
    history.push(url);
    callback();
  }
  function checkteamexists(teamname) {
    if (teamname.toString().toLowerCase() == 'pr2w') {
      teamid = 765879;
    } else if (teamname.toString().toLowerCase() == 'snaake') {
      teamid = 1375202;
    } else {
      pushhistory('/', function () {
        teamhome1_message();
      });
    }
  }

  ////////////////////////////
  // Part 8: Initialization //
  ////////////////////////////
  useEffect(() => {
    checklogin(function () {
      checkauth(function () {
        checkteamexists(teamname);
      });
    });
  }, []);

  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                <Title level={2}>
                  {teamname.toString().toUpperCase()} Event Admin
                </Title>
              </div>
              <Space size='small' className='home-button-toolbar'>
                <Link to={'/team/' + teamname + '/create_event/'}>
                  <Button className='viewapi-button'>Create Event</Button>
                </Link>
                <Link to={'/team/' + teamname + '/api/'}>
                  <Button type='dashed' className='viewapi-button'>
                    View API
                  </Button>
                </Link>
              </Space>
            </div>
            <br />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
