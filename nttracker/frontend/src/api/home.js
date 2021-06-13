import { useContext } from "react";

import "antd/dist/antd.css";
import { Card, Row, Col, Collapse, Button } from "antd";

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";
import { Link } from "react-router-dom"

import "./api_universal.css";


const { Panel } = Collapse;


function APIHome() {
  const [state, dispatch] = useContext(NTTrackerContext);
  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}><h1>API Home</h1></div>
              <div>
                <Link to="/">
                  <Button type="dashed" className="viewapi-button">Go back</Button>
                </Link>
              </div>
            </div>
            <br/>
            <Collapse bordered={false}>
              <Panel
                header="Race data: stores every user's team race count, characters
                  typed/missed, and time at a given point forever (updated every 15 minutes)"
                key="1">
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
              </Panel>
              <Panel 
                header="Racer log: stores every user's username, total races, and average
                  speed for the past year (updated every one week)"
                key="2">
                Race
              </Panel>
              <Panel 
                header="Racer data: stores every user's role (in team), join stamp, last\
                  activity, and last login for the last entry (updated every 15 mins)"
                key="3">
                Race data
              </Panel>
              <Panel 
                header="Team data: stores every user's team race count, characters
                  typed/missed, and time at a given point forever (updated every one week)"
                key="4">
                Race data
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default APIHome;
