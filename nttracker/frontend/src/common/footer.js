import React from 'react';

import { Typography } from 'antd';
import 'antd/dist/antd.css';

import './footer.css';

const { Text } = Typography;

function Footer() {
  return (
    <div className='main-footer-1 item-no-select'>
      <Text className='main-footer-text no-margin-below little-margin-top'>
        Created using ten hours a day and gallons of rage
      </Text>
      <br />
      <Text className='main-footer-text little-margin-below'>
        &#169;crimsonpython24 2021&nbsp;&#183;&nbsp;Contribute to and{' '}
        <strong>star</strong> this project at{' '}
        <a href='https://github.com/crimsonpython24/nttracker' target='_blank'>
          GitHub
        </a>
        !
      </Text>
    </div>
  );
}

export default Footer;
