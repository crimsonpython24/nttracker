import { useContext } from "react";

import "antd/dist/antd.css";
import { Table } from 'antd';

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";

import "./api_universal.css";


function APIRaceData() {
  const [state, dispatch] = useContext(NTTrackerContext);
  console.log(state.raceapi.racedata)
  return (
    <div className="mrg-right-25">
      <ReactJson src={state.raceapi} />
    </div>
  )
}


export default APIRaceData;
