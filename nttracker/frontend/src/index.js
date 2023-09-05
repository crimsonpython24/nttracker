import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import './index.css';
import NTTrackerContextProvider from './nttracker/context';
import NTTracker from './nttracker/dom';

import enUS from 'antd/lib/calendar/locale/en_US';

let development = true; // use true while testing in 3000
let url = !development ? 'initstate' : 'teststate'; // use TESTUSER_ID=1 when running with teststate

Promise.all([fetch('http://127.0.0.1:8000/accounts/initstate')])
  .then(([usr]) => Promise.all([usr.json()]))
  .then(([usr]) => {
    const initialState = {
      user: usr.user,
      site: { locale: enUS },
      raceapi: {
        racedata: {},
        racerlog: {},
        racerdata: {},
        teamdata: {},
        datatime: { racedata: 0, racerlog: 0, racerdata: 0, teamdata: 0 },
      },
    };
    const App = () => {
      return (
        <NTTrackerContextProvider initState={initialState}>
          <NTTracker />
        </NTTrackerContextProvider>
      );
    };
    ReactDOM.render(<App />, document.getElementById('root'));
  });
