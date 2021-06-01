import React, { useContext } from "react";

import "antd/dist/antd.css";
import { PageHeader, Button, Tooltip, message, Dropdown, Menu } from "antd";
import { InfoCircleOutlined, DownOutlined, GlobalOutlined } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive"

import { NTTrackerContext } from "../nttracker/context.js";
import fetchData from "../common/utilities.js";
import "./navbar.css";


function Navbar() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' })
  const history = useHistory();

  function post_logout() {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogout", 'POST', {})
    .then((json) => {
      dispatch({
        type: 'LOGGED_OUT'
      });
      message.success({
        content: "Logged out successfully!", duration: 3.55, onClick: () => {message.destroy();}
      })
      history.push("/");
      localStorage.removeItem('ever_logged_in');
    })
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">English (US)</Menu.Item>
      <Menu.Item key="2">中文（繁體）</Menu.Item>
      <Menu.Item key="3">Español (ES)</Menu.Item>
    </Menu>
  );

  function Localedropdown() {
    return (
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Button className="no-left-margin-navbar">
          <GlobalOutlined className="less-right-mrg-navbar"/> <DownOutlined />
        </Button>
      </Dropdown>
    )
  }

  function extras(authenticated, shrink) {
    // if (shrink) return null;
    if (authenticated) {
      return (
        <>
          <Localedropdown/>
          <div className="authenticated-links">
            [{state.user.username}] <Link to='/' className="link-text-color">Home
              </Link> • <Link to='/accounts/profile' className="link-text-color">Settings
              </Link> • <span onClick={post_logout} className="link-post-logout">
              Log out</span>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Tooltip placement="bottomRight" 
            title={"Sign-up is limited for team admins; however, you could still\
                    view stats without authentication"}>
            <InfoCircleOutlined className="info-no-login"/>
          </Tooltip>
          <Localedropdown/> 
          <Link to="/accounts/login" key="login"><Button type="primary">Log in</Button></Link>
        </>
      )
    }
  }

  return (
    <PageHeader
      title={<Link to="/" style={{ color: "#262626" }}>NT Stats Tracker</Link>}
      extra={ extras(state.user.authenticated, shrinkNavbar) }
      className="navbar-1"
    ></PageHeader>
  )
}


export default Navbar;
