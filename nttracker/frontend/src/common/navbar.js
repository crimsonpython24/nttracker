import React, { useContext } from "react";

import "antd/dist/antd.css";
import { PageHeader, Dropdown, Button, Tag, Menu, Avatar, Tooltip } from "antd";
import { EllipsisOutlined, UserOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { NTTrackerContext } from '../nttracker/context.js';
import "./navbar.css";
import ProfileCard from './profilecard.js'


const menu = (
  <Menu>
    <Menu.Item><Link to="/feedback">Feedback</Link></Menu.Item>
  </Menu>
);


const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu} trigger={["click"]}>
      <Button style={{ border: "none", padding: 0 }}>
        <EllipsisOutlined
          style={{ fontSize: 20, verticalAlign: "middle" }}
        />
      </Button>
    </Dropdown>
  );
};


function Navbar() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' })
  const shrinkTag = useMediaQuery({ query: '(max-width: 374px)' })

  function extras(authenticated, shrink) {
    if (shrink) return null;
    if (authenticated) {
      return (
        <>
          <Dropdown overlay={<ProfileCard/>} placement="bottomLeft" trigger={['click']}>
            <Avatar icon={<UserOutlined />} key={1} />
          </Dropdown>
          <DropdownMenu key="more" />
        </>
      )
    } else {
      return (
        <>
          <Tooltip placement="bottomRight" 
            title={"Sign-up is closed to non-team admins; however, you could still\
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
