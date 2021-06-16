import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Card, Row, Col, Space, Button, message } from "antd";

import { Link, useParams, useHistory } from "react-router-dom"

import { NTTrackerContext } from "../nttracker/context";
import "./home.css"


function useLogin(state, url, loginMessage) {
  const history = useHistory();
  const logged_in = state.user.authenticated;
  useEffect(() => {
    if (!logged_in) {
      history.push(url);
      loginMessage();
    }
  }, [logged_in])
  return logged_in;
}


function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const { teamname } = useParams();
  const history = useHistory();
  let teamid;

  //////////////////////////
  // Part 4: Handle Login //
  //////////////////////////
  // function checklogin(callback) {
  //   if (!state.user.authenticated) 
  //     pushhistory("/accounts/login", function(){teamhome2_message();});
  //   else 
  //     callback();
  // }

  let has_group_auth = false;
  function checkauth(callback) {
    state.user.available_teams.forEach(function(currentValue) {
      if (currentValue.toString().toLowerCase() === teamname.toString().toLowerCase()) {
        has_group_auth = true;
      }
    })
    if (!has_group_auth) {
      if (state.user.available_teams.length != 0)
        pushhistory("/team/" + state.user.available_teams[0], function() {
          teamhome3_message()
        });
      else
        pushhistory("/", function() {teamhome3_message()});
    } else {
      callback();
    }
  }

  /////////////////////
  // Part 5: Message //
  /////////////////////
  function teamhome1_message() {
    const info = message.warning({
      key: "teamhome1",
      content: "Team " + teamname + " not found!",
      duration: 5.35, onClick: () => {info("teamhome1");},
      className: "item-no-select",
    });
  };
  function teamhome2_message() {
    const info = message.error({
      key: "teamhome2",
      content: "Log in to access team data!",
      duration: 5.35, onClick: () => {info("teamhome2");},
      className: "item-no-select",
    });
  };
  function teamhome3_message() {
    const info = message.warning({
      key: "teamhome3",
      content: "You do not have access to this team admin!",
      duration: 5.35, onClick: () => {info("teamhome3");},
      className: "item-no-select",
    });
  };

  /////////////////////////
  // Part 7: Redirection //
  /////////////////////////
  function pushhistory(url, callback) {
    history.push(url);
    callback();
  }
  function checkteamexists(teamname) {
    if (teamname.toString().toLowerCase() == "pr2w") {
      teamid = 765879;
    } else if (teamname.toString().toLowerCase() == "snaake") {
      teamid = 1375202;
    }
    else {pushhistory("/", function() {teamhome1_message()});}
  }

  ////////////////////////////
  // Part 8: Initialization //
  ////////////////////////////
  let loggedin = useLogin(state, "/accounts/login", teamhome2_message);
  useEffect(() => {
    if (loggedin) {
      checkauth(function() {
        checkteamexists(teamname);
      })
    }
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
