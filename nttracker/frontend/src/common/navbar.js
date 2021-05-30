import React, { useContext } from "react";

import "antd/dist/antd.css";
import { PageHeader, Dropdown, Button, Tag, Menu, Avatar, Tooltip } from "antd";
import { EllipsisOutlined, UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import jQuery from "jquery";

import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { NTTrackerContext } from '../nttracker/context.js';
import "./navbar.css";


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

function Navbar() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' })
  const shrinkTag = useMediaQuery({ query: '(max-width: 374px)' })
  const history = useHistory();

  function post_logout() {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogout", 'POST', {})
    .then((json) => {
      dispatch({
        type: 'LOGGED_OUT'
      });
      // history.push("/");
    })
  }

  function extras(authenticated, shrink) {
    if (shrink) return null;
    if (authenticated) {
      return (
        <div style={{ position: "relative", top: 5 }}>
          [{state.user.username}] <Link to='/accounts/profile'>Settings</Link> • <span onClick={post_logout} style={{ marginLeft: 0 }}>Log out</span>
        </div>
      )
    } else {
      return (
        <>
          <Tooltip placement="bottomRight" 
            title={"Sign-up is limited for team admins; however, you could still\
                    view stats without authentication"}>
            <InfoCircleOutlined 
              style={{ fontSize: 17, verticalAlign: "middle", marginRight: 15 }}
            />
          </Tooltip>
          <Link to="/accounts/login" key="login"><Button type="primary">Log in</Button></Link>
        </>
      )
    }
  }

  function addTag(shrink) {
    return !shrink && <Tag color="green">Running</Tag>
  }

  return (
    <PageHeader
      title={<Link to="/" style={{ color: "#262626" }}>NT Stats Tracker</Link>}
      tags={ addTag(shrinkTag) }
      extra={ extras(state.user.authenticated, shrinkNavbar) }
      className="navbar-1"
    ></PageHeader>
  )
}

export default Navbar;
