import React, { useContext } from "react";

import "antd/dist/antd.css";
import { PageHeader, Button, Tag, Tooltip, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { NTTrackerContext } from '../nttracker/context.js';
import fetchData from "../common/utilities.js";
import "./navbar.css";


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
      message.success('Log out successful!', 3.55);
      history.push("/");
      localStorage.removeItem('ever_logged_in');
    })
  }

  function extras(authenticated, shrink) {
    if (shrink) return null;
    if (authenticated) {
      return (
        <div style={{ position: "relative", top: 5 }}>
          [{state.user.username}] <Link to='/' className="link-text-color">Home
            </Link> • <Link to='/accounts/profile' className="link-text-color">Settings
            </Link> • <span onClick={post_logout} style={{ marginLeft: 0, color: "rgba(0, 0, 0, .85) !important" }}>
            Log out</span>
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
    return !shrink && <Tag color="green" style={{ position: "relative", top: 1 }}>Running</Tag>
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
