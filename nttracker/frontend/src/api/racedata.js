import { useContext } from "react";

import "antd/dist/antd.css";
import { Card, Row, Col, Button } from "antd";

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";
import { Link } from "react-router-dom"

import "./api_universal.css";


function APIRaceData() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <Row>
      <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
      <Col xs={22} sm={20} md={18} lg={16} xl={12}>
        <Card>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}><h1>Race API</h1></div>
            <div>
              <Link to="/api/">
                <Button type="dashed" className="viewapi-button">API Home</Button>
              </Link>
            </div>
          </div>
          <h3>Note: as the files below contain historical data, please use
              the <a href="/data/racedata_json/" target="_blank">raw API</a> if
              possible. <br/>Only use the visualizer if necessary.
            </h3>
          <ReactJson 
            src={state.raceapi.racedata}
            theme="bright:inverted"
            iconStyle="square"
            enableClipboard={true}
            displayDataTypes={true}
            displayObjectSize={true}
            collapsed={true}
            collapseStringsAfterLength={15}
          />
        </Card>
      </Col>
    </Row>
  )
}


export default APIRaceData;
