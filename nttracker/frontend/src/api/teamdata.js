import { useContext } from "react";

import "antd/dist/antd.css";
import { Table } from 'antd';

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";

import "./api_universal.css";


function APITeamData() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <div className="mrg-right-25">
      <h1>API Team Data</h1>
    </div>
  )
}


export default APITeamData;
