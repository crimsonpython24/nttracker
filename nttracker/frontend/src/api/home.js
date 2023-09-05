import { useContext, useEffect, useState } from 'react';

import {
  Button,
  Card,
  Col,
  Collapse,
  Row,
  Switch,
  Typography,
  message,
} from 'antd';
import 'antd/dist/antd.css';

import ReactJson from 'react-json-view';
import { Link, useHistory, useParams } from 'react-router-dom';

import { NTTrackerContext } from '../nttracker/context.js';
import './api_universal.css';

const { Panel } = Collapse;
const { Text, Title } = Typography;

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function APIHome() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const { teamname } = useParams();
  let teamid;
  let last_updated_rcd = 0;
  let last_updated_rcl = 0;
  let last_updated_rcrd = 0;
  let last_updated_td = 0;

  //////////////////////////
  // Part 4: Handle Login //
  //////////////////////////
  function checklogin(callback) {
    if (!state.user.authenticated)
      pushhistory('/accounts/login', function () {
        apihome2_message();
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
        pushhistory(
          '/team/' + state.user.available_teams[0] + '/api/',
          function () {
            apihome3_message();
          }
        );
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
  function apihome1_message() {
    const info = message.warning({
      key: 'apihome1',
      content: 'Team ' + { teamname } + ' is not found!',
      duration: 5.35,
      onClick: () => {
        info('apihome1');
      },
      className: 'item-no-select',
    });
  }
  function apihome2_message() {
    const info = message.error({
      key: 'apihome2',
      content: 'Log in to access team API!',
      duration: 5.35,
      onClick: () => {
        info('apihome2');
      },
      className: 'item-no-select',
    });
  }
  function apihome3_message() {
    const info = message.warning({
      key: 'apihome3',
      content: 'You do not have access to this API admin!',
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

  function checkteamexists(teamname, callback) {
    if (teamname.toString().toLowerCase() == 'pr2w') {
      teamid = 765879;
      callback();
    } else if (teamname.toString().toLowerCase() == 'snaake') {
      teamid = 1375202;
      callback();
    } else {
      pushhistory('/', function () {
        apihome1_message();
      });
    }
  }

  ////////////////////////////
  // Part 8: Initialization //
  ////////////////////////////
  useEffect(() => {
    checklogin(function () {
      checkauth(function () {
        checkteamexists(teamname, function () {
          Promise.all([
            fetch('http://127.0.0.1:8000/data/racedata_json/' + teamid + '/'),
            fetch('http://127.0.0.1:8000/data/racerlog_json/' + teamid + '/'),
            fetch('http://127.0.0.1:8000/data/racerdata_json/' + teamid + '/'),
            fetch('http://127.0.0.1:8000/data/teamdata_json/' + teamid + '/'),
          ])
            .then(([rcdata, rclog, rcrdata, tdata]) =>
              Promise.all([
                rcdata.json(),
                rclog.json(),
                rcrdata.json(),
                tdata.json(),
              ])
            )
            .then(([rcdata, rclog, rcrdata, tdata]) => {
              handleapi(rcdata, rclog, rcrdata, tdata);
              dispatch({
                type: 'REFRESH_APIS',
                data: {
                  racedata: rcdata,
                  racerlog: rclog,
                  racerdata: rcrdata,
                  teamdata: tdata,
                  data_date: {
                    racedata: last_updated_rcd,
                    racerlog: last_updated_rcl,
                    racerdata: last_updated_rcrd,
                    teamdata: last_updated_td,
                  },
                },
              });
            });
        });
      });
    });
  }, []);

  ////////////////////////////
  // Part 9: Event Handlers //
  ////////////////////////////
  const [simpJson, setSimpJson] = useState(false);
  function onSimplifiedJsonChange(checked) {
    setSimpJson(checked);
  }

  const handleapi = (rcdata, rclog, rcrdata, tdata) => {
    if (typeof rcdata['racedata'][rcdata['racedata'].length - 1] == 'undefined')
      last_updated_rcd = 0;
    else
      last_updated_rcd =
        rcdata['racedata'][rcdata['racedata'].length - 1]['timestamp'];
    if (typeof rclog['racerlog'][rclog['racerlog'].length - 1] == 'undefined')
      last_updated_rcl = 0;
    else
      last_updated_rcl =
        rclog['racerlog'][rclog['racerlog'].length - 1]['timestamp'];
    if (
      typeof rcrdata['racerdata'][rcrdata['racerdata'].length - 1] ==
      'undefined'
    )
      last_updated_rcrd = 0;
    else
      last_updated_rcrd =
        rcrdata['racerdata'][rcrdata['racerdata'].length - 1]['timestamp'];
    if (typeof tdata['teamdata'][tdata['teamdata'].length - 1] == 'undefined')
      last_updated_td = 0;
    else
      last_updated_td =
        tdata['teamdata'][tdata['teamdata'].length - 1]['timestamp'];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Promise.all([
        fetch('http://127.0.0.1:8000/data/racedata_json/' + teamid + '/'),
        fetch('http://127.0.0.1:8000/data/racerlog_json/' + teamid + '/'),
        fetch('http://127.0.0.1:8000/data/racerdata_json/' + teamid + '/'),
        fetch('http://127.0.0.1:8000/data/teamdata_json/' + teamid + '/'),
      ])
        .then(([rcdata, rclog, rcrdata, tdata]) =>
          Promise.all([
            rcdata.json(),
            rclog.json(),
            rcrdata.json(),
            tdata.json(),
          ])
        )
        .then(([rcdata, rclog, rcrdata, tdata]) => {
          handleapi(rcdata, rclog, rcrdata, tdata);
          dispatch({
            type: 'REFRESH_APIS',
            data: {
              racedata: rcdata,
              racerlog: rclog,
              racerdata: rcrdata,
              teamdata: tdata,
              data_date: {
                racedata: last_updated_rcd,
                racerlog: last_updated_rcl,
                racerdata: last_updated_rcrd,
                teamdata: last_updated_td,
              },
            },
          });
        });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                <Title level={2}>API Home</Title>
                <Text>
                  <strong>
                    Click on the grey boxes to expand their content!
                  </strong>
                </Text>
                <Text>
                  Please be patient when expanding the visualized JSON within
                  each panel.
                  <br />A delay of up to ten seconds is normal; use the
                  unformatted JSON file if the visualizer failed to load.
                </Text>
                Only show the latest JSON entry{' '}
                <Switch
                  size='small'
                  onChange={() => onSimplifiedJsonChange()}
                />
              </div>
              <div>
                <Link to={'/team/' + teamname}>
                  <Button type='dashed' className='viewapi-button'>
                    Go back
                  </Button>
                </Link>
              </div>
            </div>
            <br />
            <Collapse bordered={false}>
              <Panel header='Update Status' key='1'>
                <div className='padding-within'>
                  <div>
                    <ul>
                      <li>
                        Racedata:{' '}
                        {state.raceapi.datatime.racedata == 0
                          ? 'Not Updated Yet'
                          : timeConverter(state.raceapi.datatime.racedata)}
                      </li>
                      <li>
                        Racerlog:{' '}
                        {state.raceapi.datatime.racerlog == 0
                          ? 'Not Updated Yet'
                          : timeConverter(state.raceapi.datatime.racerlog)}
                      </li>
                      <li>
                        Racerdata:{' '}
                        {state.raceapi.datatime.racerdata == 0
                          ? 'Not Updated Yet'
                          : timeConverter(state.raceapi.datatime.racerdata)}
                      </li>
                      <li>
                        Teamdata:{' '}
                        {state.raceapi.datatime.teamdata == 0
                          ? 'Not Updated Yet'
                          : timeConverter(state.raceapi.datatime.teamdata)}
                      </li>
                    </ul>
                  </div>
                </div>
              </Panel>
              <Panel
                header="Race data: stores every user's team race count, characters
                  typed/missed, and time at a given point forever (updated every 15 minutes)"
                key='2'
              >
                <div className='padding-within'>
                  <div>
                    <Text>
                      <i>
                        Use the
                        <Link
                          to={'/data/racedata_json/' + teamid}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {' '}
                          raw api{' '}
                        </Link>
                        if the visualized data cannot load.
                      </i>
                    </Text>
                    <ReactJson
                      src={simpJson ? {} : state.raceapi.racedata}
                      theme='bright:inverted'
                      iconStyle='square'
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
              <Panel
                header="Racer log: stores every user's username, total races, and average
                  speed for the past year (updated every one week)"
                key='3'
              >
                <div className='padding-within'>
                  <div>
                    <Text>
                      <i>
                        Use the
                        <Link
                          to='/data/racerlog_json/'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          raw api
                        </Link>
                        if the visualized data cannot load.
                      </i>
                    </Text>
                    <ReactJson
                      src={state.raceapi.racerlog}
                      theme='bright:inverted'
                      iconStyle='square'
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
              <Panel
                header="Racer data: stores every user's role (in team), join stamp, last\
                  activity, and last login for the last entry (updated every 15 mins)"
                key='4'
              >
                <div className='padding-within'>
                  <div>
                    <Text>
                      <i>
                        Use the
                        <Link
                          to='/data/racerdata_json/'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {' '}
                          raw api{' '}
                        </Link>
                        if the visualized data cannot load.
                      </i>
                    </Text>
                    <ReactJson
                      src={state.raceapi.racerdata}
                      theme='bright:inverted'
                      iconStyle='square'
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
              <Panel
                header="Team data: stores every user's team race count, characters
                  typed/missed, and time at a given point forever (updated every one week)"
                key='5'
              >
                <div className='padding-within'>
                  <div>
                    <Text>
                      <i>
                        Use the
                        <Link
                          to='/data/teamdata_json/'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {' '}
                          raw api{' '}
                        </Link>
                        if the visualized data cannot load.
                      </i>
                    </Text>
                    <ReactJson
                      src={state.raceapi.teamdata}
                      theme='bright:inverted'
                      iconStyle='square'
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default APIHome;
