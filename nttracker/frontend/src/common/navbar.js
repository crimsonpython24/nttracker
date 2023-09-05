import React, { useContext } from 'react';

import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, PageHeader, Tooltip, message } from 'antd';
import 'antd/dist/antd.css';

import enUS from 'antd/lib/locale/en_US';
import zhTW from 'antd/lib/locale/zh_TW';

import { useMediaQuery } from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';

import { fetchData } from '../common/utilities.js';
import { NTTrackerContext } from '../nttracker/context.js';
import './navbar.css';

function Navbar() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const shrinkNavbar = useMediaQuery({ query: '(max-width: 533px)' });
  const history = useHistory();

  ////////////////////////////
  // Part 6: Post Functions //
  ////////////////////////////
  function post_logout() {
    fetchData('http://127.0.0.1:8000/accounts/ajaxlogout', 'POST', {}).then(
      json => {
        dispatch({ type: 'LOGGED_OUT' });
        pushhistory('/', function () {
          navbar1_message();
        });
        localStorage.removeItem('ever_logged_in');
      }
    );
  }

  /////////////////////////
  // Part 7: Redirection //
  /////////////////////////
  function pushhistory(url, callback) {
    history.push(url);
    callback();
  }

  ////////////////////////////
  // Part 9: Event Handlers //
  ////////////////////////////
  function changeLocale(locale, name) {
    dispatch({ type: 'SWITCHED_LOCALE', locale });
    navbar2_message(name);
  }

  ////////////////////////////////////
  // Part 10: Additional Components //
  ////////////////////////////////////
  const navbar1_message = () => {
    const info = message.info({
      key: 'navbar1',
      content: 'Logged out!',
      duration: 3.55,
      onClick: () => {
        info('navbar1');
      },
      className: 'item-no-select',
    });
  };
  const navbar2_message = content => {
    const info = message.info({
      key: 'navbar2',
      content: 'Changed locale to ' + content,
      duration: 3.55,
      onClick: () => {
        info('navbar2');
      },
      className: 'item-no-select',
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={() => changeLocale(enUS, 'English (US)')}>
        English (US)
      </Menu.Item>
      <Menu.Item key='2' onClick={() => changeLocale(zhTW, '中文（繁體）')}>
        中文（繁體）
      </Menu.Item>
    </Menu>
  );
  const Localedropdown = () => {
    return (
      <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
        <Tooltip
          placement='leftTop'
          title={
            "Change locale (doesn't change the language, \
            only the format of interfaces)"
          }
        >
          <Button className='no-left-margin-navbar'>
            <GlobalOutlined className='no-mrg-navbar' />
          </Button>
        </Tooltip>
      </Dropdown>
    );
  };
  const extras = (authenticated, shrink) => {
    if (authenticated) {
      return (
        <div>
          <Localedropdown style={{ display: 'inline-block' }} />
          <div
            className='authenticated-links item-no-select'
            style={{
              display: 'inline-block',
              position: 'relative',
              top: -1,
              marginLeft: 10,
            }}
          >
            [{state.user.username}]{' '}
            <Link to='/' className='link-text-color'>
              Home
            </Link>{' '}
            •{' '}
            <Link to='/accounts/profile' className='link-text-color'>
              Settings
            </Link>{' '}
            •{' '}
            <span onClick={post_logout} className='link-post-logout'>
              Log out
            </span>
          </div>
        </div>
      );
    } else {
      return <Localedropdown />;
    }
  };

  return (
    <>
      <PageHeader
        title={
          <Link to='/' style={{ color: '#262626' }}>
            NT Stats Tracker
          </Link>
        }
        extra={extras(state.user.authenticated, shrinkNavbar)}
        className='navbar-1'
      ></PageHeader>
    </>
  );
}

export default Navbar;
