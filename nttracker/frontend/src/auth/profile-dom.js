import React, { useContext, useState } from "react";

import "antd/dist/antd.css";
import './profile-dom.css';

import { useHistory } from "react-router-dom";
import { NTTrackerContext } from "../nttracker/context.js";
import { WarningOutlined } from "@ant-design/icons";
import { message, Form, Input, Button, Tooltip, Divider, Row, Col } from "antd";
import { useMediaQuery } from 'react-responsive'


function Profile() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();

  if (state.user.authenticated)
    localStorage.setItem('ever_logged_in', true);

  const has_auth = localStorage.getItem('ever_logged_in');

  if (!has_auth) {
    console.log(has_auth);
    message.warning('Please log in to edit account', 3.55);
    history.push("/accounts/login");
  }

  const [form] = Form.useForm();
  const formLayout = 'vertical';

  const large_screen = useMediaQuery({ query: '(min-width: 1030px)' })
  const medium_screen = useMediaQuery({ query: '(min-width: 575px)' })
  const small_screen = useMediaQuery({ query: '(max-width: 574px)' })

  
  let formItemLayout = {
    wrapperCol: {
      span: 0,
      offset: 0
    },
    labelCol: { offset: 0 },
  }

  if (large_screen) {
    formItemLayout.wrapperCol.span = 10;
    formItemLayout.wrapperCol.offset = 6;
    formItemLayout.labelCol.offset = 6;
  } else if (medium_screen) {
    formItemLayout.wrapperCol.span = 13;
    formItemLayout.wrapperCol.offset = 4;
    formItemLayout.labelCol.offset = 4;
  } else {
    formItemLayout.wrapperCol.span = 17;
    formItemLayout.wrapperCol.offset = 2;
    formItemLayout.labelCol.offset = 2;
  }
  
  return (
    <div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
      >
        <Form.Item label="Username">
          <Input placeholder={state.user.username} disabled={true}
          suffix = {
            <Tooltip placement="rightTop"
              title={"Changing username is disabled for security reasons.\
                      Please contact the site owner."}>
                <WarningOutlined 
                style={{ fontSize: 17, verticalAlign: "middle", marginRight: 15 }}
              />
            </Tooltip>
            }
          />
        </Form.Item>
        <Divider/>
        <Form.Item label="Current Password">
          <Input/>
        </Form.Item>
        <Form.Item label="New Password">
          <Input/>
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input/>
        </Form.Item>
        <Form.Item >
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile;