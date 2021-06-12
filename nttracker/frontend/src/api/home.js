import { useContext } from "react";

import "antd/dist/antd.css";
import { Table } from 'antd';

import { NTTrackerContext } from "../nttracker/context.js";

import { Link } from "react-router-dom"

import "./api_universal.css";


function APIHome() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <div className="mrg-right-25">
      <h1>API Home</h1>
      <ul>
        <li>
          <Link to="/api/racedata">Race data</Link>
           : stores every user's team race count, characters typed/missed, and time at
           a given point forever (updated every 15 minutes)
        </li>
        <li>
          <Link to="/api/racerlog">Racer log</Link>
           : stores every user's username, total races, and average speed for the past
           year (updated every one week)
        </li>
        <li>
          <Link to="/api/racerdata">Racer data</Link>
           : stores every user's role (in team), join stamp, last activity, and last
           login for the last entry (updated every 15 mins)
        </li>
        <li>
          <Link to="/api/teamdata">Team data</Link>
           : stores every user's team race count, characters typed/missed, and time at
           a given point forever (updated every one week)
        </li>
      </ul>
    </div>
  )
}


export default APIHome;
