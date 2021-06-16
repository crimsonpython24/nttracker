import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { 
  Card, Row, Col, Space, Button, message
} from "antd";

import { Link, useParams, useHistory } from "react-router-dom"

import { NTTrackerContext } from "../nttracker/context";
import "./home.css"
import { Callbacks } from "jquery";


function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const { teamname } = useParams();
  const history = useHistory();
  let teamid;

  function pushhistory(url, callback) {
    history.push(url);
    callback();
  }
  
  function teamhome1_message(callback) {
    const info = message.warning({
      key: "apihome1",
      content: "Team " + {teamname} + " is not found!",
      duration: 5.35, onClick: () => {info("apihome1");},
      className: "item-no-select",
    });
    callback();
  };

  function teamhome2_message() {
    const info = message.error({
      key: "apihome2",
      content: "Log in to access team data!",
      duration: 5.35, onClick: () => {info("apihome2");},
      className: "item-no-select",
    });
  };

  function checklogin(callback) {
    if (!state.user.authenticated) {
      pushhistory("/accounts/login", function() {teamhome2_message()});
    }
    callback();
  }

  useEffect(() => {
    checklogin(function() {
      if (teamname.toString().toLowerCase() == "pr2w") {
        teamid = 765879;
      } else if (teamname.toString().toLowerCase() == "snaake") {
        teamid = 1375202;
      }
      else {pushhistory("/", function() {teamhome1_message()});}
    })
  }, []);

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
                <Link to={"/team/" + teamname + "/api/"}>
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
