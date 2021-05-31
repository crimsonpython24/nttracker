import React, { useContext, useState } from "react";

import "antd/dist/antd.css";
import './profile-dom.css';
import { message, Form, Input, Button, Tooltip, Divider, Typography, Space, Modal, Card } from "antd";
import { WarningOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { NTTrackerContext } from "../nttracker/context.js";


const { Text, Link } = Typography;
const { confirm } = Modal;

function Profile() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const [form] = Form.useForm();
  const formLayout = 'vertical';
  const large_screen = useMediaQuery({ query: '(min-width: 1030px)' })
  const medium_screen = useMediaQuery({ query: '(min-width: 575px)' })
  let has_auth, formItemLayout;

  if (state.user.authenticated)
    localStorage.setItem('ever_logged_in', true);
  has_auth = localStorage.getItem('ever_logged_in');

  if (!has_auth) {
    message.warning('Please log in to edit account', 3.55);
    history.push("/accounts/login");
  }
  
  formItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 2
    },
    labelCol: { offset: 2 },
  }

  if (large_screen) {
    formItemLayout.wrapperCol.span = 10;
    formItemLayout.wrapperCol.offset = 6;
    formItemLayout.labelCol.offset = 6;
  } else {
    formItemLayout.wrapperCol.span = 13;
    formItemLayout.wrapperCol.offset = 4;
    formItemLayout.labelCol.offset = 4;
  }

  function showPromiseConfirm() {
    confirm({
      title: 'Confirm deleting account?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Space direction="vertical" size={0}>
            <Text>This action cannot be undone! All your data will be lost, but the events you've created will remain.</Text>
            <Text type="secondary">Click "cancel" or press ESC to quit operation</Text>
            <Input.Password
              placeholder="Type password to continue..."
              style={{ marginTop: 20 }}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Space>
        </>
      ),
      centered: true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Nothing here yet'));
      },
      onCancel() {},
    });
  }
  
  return (
    <div>
      <Card style= {{ display: "inline-flex !important", flexDirection: "row" }}>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Username">
            <Input placeholder={state.user.username} disabled={true} style={{ maxWidth: 530 }}
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
        </Form>
        <Divider/>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Current Password">
            <Input style={{ maxWidth: 530 }}/>
          </Form.Item>
          <Form.Item label="New Password">
            <Input style={{ maxWidth: 530 }}/>
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input style={{ maxWidth: 530 }}/>
          </Form.Item>
          <Form.Item >
            <Button>Change Password</Button>
          </Form.Item>
        </Form>
        <Divider/>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label={<Space direction="vertical" size={0} style={{ marginBottom: 10 }}><Text>Delete Account</Text><Text type="secondary">Permanently removes your account from the database (cannot be undone!)</Text></Space>}>
            <Button danger onClick={showPromiseConfirm}>Delete Account</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


export default Profile;
