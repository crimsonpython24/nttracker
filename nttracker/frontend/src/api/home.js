import { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Card, Row, Col, Collapse, Button } from "antd";

import ReactJson from 'react-json-view'
import { NTTrackerContext } from "../nttracker/context.js";
import { Link } from "react-router-dom"

import "./api_universal.css";


const { Panel } = Collapse;


function APIHome() {
  const [state, dispatch] = useContext(NTTrackerContext);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({type: "REFRESH_APIS"});
      console.log(state.raceapi.racedata)
    }, 60000);
  
    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                <h1>API Home</h1>
                <p>
                  Please be patient when expanding the visualized JSON within each panel.
                  <br/>A delay of up to ten seconds is normal; use the unformatted JSON
                  file if the visualizer failed to load.
                </p>
              </div>
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
                  <div className="padding-within">
                    <div>
                      <p><i>Use the <Link to="/data/racedata_json/">raw api</Link> if the
                         visualized data cannot load.</i></p>
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
                    </div>
                  </div>
              </Panel>
              <Panel 
                header="Racer log: stores every user's username, total races, and average
                  speed for the past year (updated every one week)"
                key="2">
                <div className="padding-within">
                  <div>
                    <p><i>Use the <Link to="/data/racerlog_json/">raw api</Link> if the
                       visualized data cannot load.</i></p>
                    <ReactJson 
                      src={state.raceapi.racerlog}
                      theme="bright:inverted"
                      iconStyle="square"
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
              <Panel 
                header="Racer data: stores every user's role (in team), join stamp, last\
                  activity, and last login for the last entry (updated every 15 mins)"
                key="3">
                <div className="padding-within">
                  <div>
                    <p><i>Use the <Link to="/data/racerdata_json/">raw api</Link> if the
                       visualized data cannot load.</i></p>
                    <ReactJson 
                      src={state.raceapi.racerdata}
                      theme="bright:inverted"
                      iconStyle="square"
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
              <Panel 
                header="Team data: stores every user's team race count, characters
                  typed/missed, and time at a given point forever (updated every one week)"
                key="4">
                <div className="padding-within">
                  <div>
                    <p><i>Use the <Link to="/data/teamdata_json/">raw api</Link> if the
                       visualized data cannot load.</i></p>
                    <ReactJson 
                      src={state.raceapi.teamdata}
                      theme="bright:inverted"
                      iconStyle="square"
                      enableClipboard={true}
                      displayDataTypes={true}
                      displayObjectSize={true}
                      collapsed={true}
                      collapseStringsAfterLength={15}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default APIHome;
