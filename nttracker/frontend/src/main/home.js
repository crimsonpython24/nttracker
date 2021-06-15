import React, { useContext } from "react";

import "antd/dist/antd.css";
import { 
  Card, Row, Col, Space, Button, message
} from "antd";

import { Link, useParams, useHistory } from "react-router-dom"

import { NTTrackerContext } from "../nttracker/context";
import "./home.css"


function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const { teamname } = useParams();
  const history = useHistory();
  let teamid;
  
  function teamhome1_message() {
    const info = message.warning({
      key: "apihome1",
      content: "Team " + {teamname} + " is not found!",
      duration: 5.35, onClick: () => {info("apihome1");},
      className: "item-no-select",
    });
  };

  if (teamname.toString().toLowerCase() == "pr2w") {
    teamid = 765879;
  } else if (teamname.toString().toLowerCase() == "snaake") {
    teamid = 1375202;
  }
  else {teamhome1_message()}

  if (!state.user.authenticated) history.push("/accounts/login");

  return (
    <div>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                <h1>{ teamname.toString().toUpperCase() } Event Admin</h1>
              </div>
              <Space size="small" className="home-button-toolbar">
                <Button type="primary" className="viewapi-button">Create Event</Button>
                <Link to={"/api/" + teamname}>
                  <Button type="dashed" className="viewapi-button">View API</Button>
                </Link>
              </Space>
            </div>
            <br/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default Home;
