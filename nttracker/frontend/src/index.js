import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import NTTrackerContextProvider from './nttracker/context';
import NTTracker from './nttracker/dom';
import "./index.css";

import enUS from "antd/lib/calendar/locale/en_US";


let development = false;                               // use true while testing in 3000
let url = !development ? "initstate" : "teststate";   // use TESTUSER_ID=1 when running with teststate


Promise.all([
  fetch(("http://127.0.0.1:8000/accounts/initstate")),
  ])
  .then((([usr]) => Promise.all(
    [usr.json()]
  )))
  .then(([usr]) => {
    const initialState = {
      user: usr.user,
      site: {locale: enUS,},
      raceapi: {
        racedata: {}, racerlog: {}, racerdata: {}, teamdata: {},
      }
    };
    const App = () => {
      return (
        <NTTrackerContextProvider initState={initialState}>
          <NTTracker/>
        </NTTrackerContextProvider>
      )
    };
    ReactDOM.render(<App />, document.getElementById('root'));
  })


// Promise.all([
//   fetch(("http://127.0.0.1:8000/accounts/teststate")),
//   fetch("http://127.0.0.1:8000/data/racedata_json/"),
//   fetch("http://127.0.0.1:8000/data/racerlog_json/"),
//   fetch("http://127.0.0.1:8000/data/racerdata_json/"),
//   fetch("http://127.0.0.1:8000/data/teamdata_json/"),
//   ])
//   .then((([usr, rcdata, rclog, rcrdata, tdata]) => Promise.all(
//     [usr.json(), rcdata.json(), rclog.json(), rcrdata.json(), tdata.json()]
//   )))
//   .then(([usr, rcdata, rclog, rcrdata, tdata]) => {
//     const initialState = {
//       user: usr.user,
//       site: {locale: enUS,},
//       raceapi: {
//         racedata: rcdata, racerlog: rclog, racerdata: rcrdata, teamdata: tdata,
//       }
//     };
//     const App = () => {
//       return (
//         <NTTrackerContextProvider initState={initialState}>
//           <NTTracker/>
//         </NTTrackerContextProvider>
//       )
//     };
//     ReactDOM.render(<App />, document.getElementById('root'));
//   })
