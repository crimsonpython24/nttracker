import React, { useContext } from "react";

import "antd/dist/antd.css";
import { PageHeader, Button, Tooltip, message, Dropdown, Menu, ConfigProvider } from "antd";
import { InfoCircleOutlined, DownOutlined, GlobalOutlined } from "@ant-design/icons";

import enUS from 'antd/lib/locale/en_US';
import zhTW from 'antd/lib/locale/zh_TW';

import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive"

import { NTTrackerContext } from "../nttracker/context.js";
import fetchData from "../common/utilities.js";
import "./navbar.css";


function Navbar() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' })
  const history = useHistory();

  console.log('state', state);
  console.log('state', state.user.user.authenticated);

  const navbar1_message = () => {
    const info = message.info({
      key: "navbar1", content: "Logged out!", duration: 3.55, onClick: () => {info("navbar1");}, className: "item-no-select",
    });
  };
  const navbar2_message = (content) => {
    const info = message.info({
      key: "navbar2", content: ("Changed locale to " + content), duration: 3.55, onClick: () => {info("navbar2");}, className: "item-no-select",
    });
  };

  function post_logout() {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogout", 'POST', {})
    .then((json) => {
      dispatch({
        type: 'LOGGED_OUT'
      });
      navbar1_message();
      history.push("/");
      localStorage.removeItem('ever_logged_in');
    })
  }

  function changeLocale(locale, name) {
    dispatch({
      type: "SWITCHED_LOCALE", locale
    });
    navbar2_message(name);
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => changeLocale(enUS, "English (US)")}>English (US)</Menu.Item>
      <Menu.Item key="2" onClick={() => changeLocale(zhTW, "中文（繁體）")}>中文（繁體）</Menu.Item>
    </Menu>
  );

  function Localedropdown() {
    return (
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Tooltip placement="leftTop" 
            title={"Change locale (doesn't change the language, only the format of interfaces)"}>
            <Button className="no-left-margin-navbar">
              <GlobalOutlined className="no-mrg-navbar"/>
            </Button>
          </Tooltip>
      </Dropdown>
    )
  }

  function extras(authenticated, shrink) {
    // if (shrink) return null;
    if (authenticated) {
      return (
        <div>
          <Localedropdown style={{ display: "inline-block" }}/>
          <div className="authenticated-links item-no-select" style={{ display: "inline-block", position: "relative", top: -1, marginLeft: 10 }}>
            [{state.user.username}] <Link to='/' className="link-text-color">Home
              </Link> • <Link to='/accounts/profile' className="link-text-color">Settings
              </Link> • <span onClick={post_logout} className="link-post-logout">
              Log out</span>
          </div>
        </div>
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
    <>
      <PageHeader
        title={<Link to="/" style={{ color: "#262626" }}>NT Stats Tracker</Link>}
        extra={ extras(state.user.user.authenticated, shrinkNavbar) }
        className="navbar-1"
      ></PageHeader>
    </>
  )
}


export default Navbar;
