import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import './profile-dom.css';
import { message, Form, Input, Button, Tooltip, Divider, Typography, Space, Modal, Card, Row, Col, Progress } from "antd";
import { WarningOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";

import { NTTrackerContext } from "../nttracker/context.js";

const { Text, Link } = Typography;
const { confirm } = Modal;

function Profile() {
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const [form] = Form.useForm();
  const formLayout = 'vertical';
  let has_auth;

  if (state.user.authenticated)
    localStorage.setItem('ever_logged_in', true);
  has_auth = localStorage.getItem('ever_logged_in');

  if (!has_auth) {
    message.warning('Please log in to edit account', 5.35);
    history.push("/accounts/login");
  }

  function showPromiseConfirm() {
    confirm({
      title: 'Confirm deleting account?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Space direction="vertical" size={0}>
            <Text>This action cannot be reverted! All your data will be lost but the events you've created will remain.</Text>
            <Text type="secondary">Click "cancel" or press ESC to quit operation. Enter your password to proceed.</Text>
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
      <Row>
        <Col xs={1} sm={3} md={5} lg={6} xl={7}></Col>
        <Col xs={22} sm={18} md={14} lg={12} xl={10}>
          <Card>
            <Form layout={formLayout} form={form}>
              <Form.Item label="Username">
                <Input placeholder={state.user.username} disabled={true} style={{ maxWidth: 560 }}
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
            <Form layout={formLayout} form={form}>
              <Form.Item label="Current Password">
                <Input style={{ maxWidth: 560 }}/>
              </Form.Item>
              <Form.Item label="New Password">
                <Input style={{ maxWidth: 560 }}/>
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input style={{ maxWidth: 560 }}/>
              </Form.Item>
              <Form.Item >
                <Button>Change Password</Button>
              </Form.Item>
            </Form>
            <Divider/>
            <Form layout={formLayout} form={form}>
              <Form.Item label={
                <Space direction="vertical" size={0} style={{ marginBottom: 10 }}>
                  <Text>Delete Account</Text>
                  <Text type="secondary">Permanently removes your account from the database (cannot be undone!)</Text>
                  </Space>
                }>
                <Button danger onClick={showPromiseConfirm}>Delete Account</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default Profile;
