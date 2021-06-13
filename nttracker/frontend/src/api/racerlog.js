import { useContext } from "react";

import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";

import "./api_universal.css";


function APIRacerLog() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <Row>
      <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
      <Col xs={22} sm={20} md={18} lg={16} xl={12}>
        <Card className="display-api-card">
          <h1>Racer Log API</h1>
          <p>Go back to <Link to="/api/">API home</Link></p>
          <h3>Note: it is normal for the site to lag when expanding data. <br/>Please allow
            up to five seconds; if the API still doesn't load, use
            the <a href="/data/racerlog_json/" target="_blank">raw API</a></h3>
          <ReactJson 
            src={state.raceapi.racerlog}
            theme="bright:inverted"
            iconStyle="square"
            enableClipboard={true}
            displayDataTypes={true}
            displayObjectSize={true}
            collapsed={1}
            collapseStringsAfterLength={15}
          />
        </Card>
      </Col>
    </Row>
  )
}


export default APIRacerLog;
