import React, { useContext } from "react";

import "antd/dist/antd.css";
import { 
  Card, Row, Col, Space, Button
} from "antd";

import { Link } from "react-router-dom"

import { NTTrackerContext } from "../nttracker/context";
import "./home.css"


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [{text: 'filter1', value: 'filter1',},],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];


function Home() {
  const [state, dispatch] = useContext(NTTrackerContext);

  if (state.user.authenticated) {
    return (
      <div>
        <Row>
          <Col xs={1} sm={2} md={3} lg={4} xl={6}></Col>
          <Col xs={22} sm={20} md={18} lg={16} xl={12}>
            <Card>
              <div style={{ display: "flex" }}>
                <div style={{ flexGrow: 1 }}><h1>PR2W Event Admin</h1></div>
                <Space size="small" className="home-button-toolbar">
                  <Button type="primary" className="viewapi-button">Create Event</Button>
                  <Link to="/api">
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
  } else {
    return (
      <div className="home-mrg-right">
        <h1>You shouldn't be here...</h1>
        <h3>Had your team mod give you the wrong link?
            Anyways, nothing for you to see before the snake awakens.
        </h3>
      </div>
    )
  }
}


export default Home;
