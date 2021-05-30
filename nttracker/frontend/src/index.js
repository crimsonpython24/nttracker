import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

import NTTrackerContextProvider from './nttracker/context';
import NTTracker from './nttracker/dom';
import "./index.css";


let development = false;                               // use true while testing in 3000
let url = !development ? "initstate" : "teststate";   // use TESTUSER_ID=1 when running with teststate


fetch(`http://127.0.0.1:8000/accounts/${url}`)
  .then(res => res.json())
  .then(
    (data) => {
      const initialState = {
        user: data.user,
      };
      const App = () => {
        return (
          <NTTrackerContextProvider initState={initialState}>
            <BrowserRouter>
              <NTTracker/>
            </BrowserRouter>
          </NTTrackerContextProvider>
        )
      };
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  )