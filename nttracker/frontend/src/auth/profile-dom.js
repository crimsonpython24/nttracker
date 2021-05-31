import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { message, Form, Input, Button, Divider, Typography, Space, Modal, Card, Row, Col, notification } from "antd";
import { QuestionCircleOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { NTTrackerContext } from "../nttracker/context.js";
import fetchData from "../common/utilities.js";
import "./profile-dom.css";


const { Text, Paragraph } = Typography;
const { confirm } = Modal;


function Profile() {
  const onSubmit = values => {post_profile(values);}
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const formLayout = "vertical";
  const { register, trigger, formState: { errors }, setError, handleSubmit, clearErrors , setValue, getValues } = useForm();
  let has_auth;

  const username_text = (
    <Paragraph editable=
      {{ editing: false,
         icon: <QuestionCircleOutlined className="help-icon" />,
         tooltip: "Changing username is disabled for security reasons. Please contact the site owner."
      }} className="label-paragraph">Username
    </Paragraph>
  )

  const current_password_text = (
    <Paragraph editable=
      {{ editing: false,
         icon: <QuestionCircleOutlined className="help-icon" />,
         tooltip: "We need to verify your identity before proceeding."
      }} className="label-paragraph">Current Password
    </Paragraph>
  )

  const handleCurPwdChange = (e) => {
    clearErrors();
    setValue("current_password", e.target.value);
  }

  const handleNewPwdChange = (e) => {
    clearErrors();
    setValue("new_password", e.target.value);
  }

  const handleCfmPwdChange = (e) => {
    clearErrors();
    setValue("confirm_password", e.target.value);
  }

  if (state.user.authenticated) {
    localStorage.setItem("ever_logged_in", true);
  }

  has_auth = localStorage.getItem("ever_logged_in");

  if (!has_auth) {
    message.warning("Please log in to edit account", 5.35);
    history.push("/accounts/login");
  }

  function showPromiseConfirm() {
    confirm({
      title: "Confirm deleting account?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Space direction="vertical" size={0}>
            <Text>This action cannot be reverted!</Text>
            <Text type="secondary">Your data will be lost but created events will remain.</Text>
            <Input.Password
              placeholder="Type the password to continue..."
              className="confirm-delete-password-box"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Space>
        </>
      ),
      centered: true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Nothing here yet"));
      },
      onCancel() {},
    });
  }

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

  useEffect(() => {
    register("current_password", {required: "The current password is required."});
    register("new_password", {
      required: "The new password is required.",
      validate: {
        passwordEqual: value => (value === getValues().confirm_password) || '',
      }
    });
    register("confirm_password", {
      required: "The confirmation password is required.",
      validate: {
        passwordEqual: value => (value === getValues().new_password) || 'Passwords do not match!',
      }
    });
  }, [register])

  function handleNotifClick(key) {
    post_logout();
    notification.close(key);
  }

  const key = `open${Date.now()}`;
  const btn = (
    <Button outline size="small" onClick={() => handleNotifClick(key)}>
      Log me out now
    </Button>
  );

  const openNotification = placement => {
    notification.success({
      message: 'Change Password Successful!',
      description:
        'Please log out to see the changes, and reload the site if necessary. You can continue using the site without disruptions.\
         Click the X on the top right corner to log out later.',
      placement,
      btn,
      key,
      duration: 10,
    });
  };

  function post_profile(data) {
    fetchData("http://127.0.0.1:8000/accounts/ajaxprofile", "POST", {
      "username": state.user.username,
      "current_password": data.current_password,
      "new_password": data.new_password,
      "confirm_password": data.confirm_password
    })
    .then((userdata) => {
      if (userdata.errors) {
        Object.keys(userdata.errors).forEach(key => {
          setError(key, {
            type: "manual",
            message: userdata.errors[key],
          });
        })
        trigger("current_password");
        trigger("new_password");
        trigger("confirm_password");
      } else {
        openNotification('topRight')
      }
    })
  }

  let curPwdProps = {
    ...(errors.current_password && {
      validateStatus: "warning",
      hasFeedback: true,
      help: errors.current_password.message,
    }),
    ...(errors.inv_credentials && {
      validateStatus: "error",
      hasFeedback: true,
      help: "Invalid credentials provided",
    })
  }

  let newPwdProps = {
    ...(errors.new_password && {
      validateStatus: "warning",
      help: errors.new_password.message,
    })
  }

  let cfmPwdProps = {
    ...(errors.confirm_password && {
      validateStatus: "warning",
      help: errors.confirm_password.message,
    })
  }
  
  return (
    <div>
      <Row>
        <Col xs={1} sm={3} md={5} lg={6} xl={7}></Col>
        <Col xs={22} sm={18} md={14} lg={12} xl={10}>
          <Card>
            <Form layout={formLayout}>
              <Form.Item label={username_text}>
                <Input placeholder={state.user.username} disabled={true} className="profile-input-box"/>
              </Form.Item>
            </Form>
            <Divider/>
            <Form layout={formLayout} onFinish={handleSubmit(onSubmit)}>
              <Form.Item label={current_password_text} {...curPwdProps}>
                <Input.Password className="profile-input-box" name="current_password" onChange={handleCurPwdChange}/>
              </Form.Item>
              <Form.Item label="New Password" {...newPwdProps}>
                <Input.Password className="profile-input-box" name="new_password" onChange={handleNewPwdChange}/>
              </Form.Item>
              <Form.Item label="Confirm Password" {...cfmPwdProps}>
                <Input.Password className="profile-input-box" name="confirm_password" onChange={handleCfmPwdChange}/>
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">Change Password</Button>
              </Form.Item>
            </Form>
            <Divider/>
            <Form layout={formLayout}>
              <Form.Item label={
                <Space direction="vertical" size={0} className="dialog-space">
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
