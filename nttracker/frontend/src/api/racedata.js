import { useContext } from "react";

import "antd/dist/antd.css";
import { Card } from 'antd';

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";
import { Link } from "react-router-dom"

import "./api_universal.css";


function APIRaceData() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <div className="mrg-right-25">
      <h1>Race Data API</h1>
      <p>Go back to <Link to="/api/">API home</Link></p>
      <h3>Note: it is normal for the site to lag when expanding data. <br/>Please allow
          up to five seconds; if the API still doesn't load, use
          the <a href="/data/racedata_json/" target="_blank">raw API</a></h3>
      <Card className="display-api-card">
        <ReactJson 
          src={state.raceapi.racedata}
          theme="bright:inverted"
          iconStyle="square"
          enableClipboard={true}
          displayDataTypes={true}
          displayObjectSize={true}
          collapsed={1}
          collapseStringsAfterLength={15}
        />
      </Card>
    </div>
  )
}


export default APIRaceData;
