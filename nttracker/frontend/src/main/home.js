import React, { useContext } from "react";

import "antd/dist/antd.css";
import { Table } from 'antd';

import { NTTrackerContext } from "../nttracker/context";
import "./home.css"


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
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
      <div className="home-mrg-right">
        <h1>Teams here</h1>
      </div>
    )
  } else {
    return (
      <div className="home-mrg-right">
        <h1>You shouldn't be here...</h1>
        <h3>Had your team mod give you the wrong link? Anyways, nothing for you to see before the snake awakens.</h3>
        <div className="home-test-locale-table">
          <Table dataSource={[]} columns={columns}  className="home-test-locale-table"/>
        </div>
      </div>
    )
  }
}


export default Home;
