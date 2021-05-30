import React, { useContext } from "react";

import "antd/dist/antd.css";
import { Card, Tooltip, Avatar } from 'antd';
import { LogoutOutlined, ExperimentOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import jQuery from "jquery";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { NTTrackerContext } from '../nttracker/context.js';

const { Meta } = Card;


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}


function fetchData(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status === 400) {
      return response.json()
      .then((json) => {
        return Promise.reject(json);
      })
    } else {
      return response.json();
    }
  });
}


function ProfileCard() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();

  function post_logout() {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogout", 'POST', {})
    .then((json) => {
      dispatch({
        type: 'LOGGED_OUT'
      });
    })
  }
  
  function cardTitle(text) {
    return (
      <p style={{ height: "24.8px", marginBottom: "0", overflow: "hidden", fontSize: "16px", textAlign: "center",
        color: "rgba(0, 0, 0, 0.85)", fontWeight: 500, whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
        { text }
      </p>
    )
  }
  function cardDesc(text) {
    return (
      <p style={{ height: "24.8px", marginBottom: "0", overflow: "hidden", fontSize: "14px", textAlign: "center",
        color: "rgba(0, 0, 0, 0.45)", fontWeight: 400, whiteSpace: "nowrap", textOverflow: "ellipsis", position: "relative", top: "-8px" }}>
        { text }
      </p>
    )
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div align="center" style={{ paddingTop: 15 }}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
      }
      actions={[
        <Tooltip placement="bottom" title="Setting"><Link to="/accounts/profile"><SettingOutlined key="settings" /></Link></Tooltip>,
        <Tooltip placement="bottom" title="Development"><Link to="/development"><ExperimentOutlined key="experiment" /></Link></Tooltip>,
        <Tooltip placement="bottom" title="Log out"><LogoutOutlined key="logout" onClick={post_logout} /></Tooltip>,
      ]}
      bodyStyle={{ paddingTop: "15px", paddingLeft: "15px", paddingRight: "15px", paddingBottom: "7px" }}
    >
      <Meta
        title={cardTitle(state.user.username)}
      />
    </Card>
  )
}

export default ProfileCard;