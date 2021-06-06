import React, { useContext, useEffect, useState } from "react";

import "antd/dist/antd.css";
import { message, Form, Input, Button, Divider, Typography, Space, Modal, Card, Row, Col, notification } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { NTTrackerContext } from "../nttracker/context.js";
import fetchData from "../common/utilities.js";
import "./profile-dom.css";


const { Text, Paragraph } = Typography;


const CollectionCreateForm = ({ visible, onCreate, onCancel, onPwdChange, itemProps, formName }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Confirm deleting account?"
      className="deletionModal"
      okText="Proceed"
      centered
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ danger: true, outline: toString(true) }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
      }}
      forceRender
    >
      <Form
        form={formName}
        layout="vertical"
        name="form_in_modal"
        className="password-form"
      >
        <Space direction="vertical" size={0} className="dialog-space">
          <Text>This action cannot be reverted!</Text>
          <Text type="secondary">
            Your data will be lost but your events will remain.
          </Text>
        </Space>
        <Form.Item name="password" className="password-form-input" {...itemProps}>
          <Input.Password placeholder="Type your password to continue" name="deactivate_confirmation" onChange={onPwdChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};


function Profile() {
  const onSubmit = values => {post_profile(values);}
  const onSubmit1 = values => {post_deactivate(values);}
  const [state, dispatch] = useContext(NTTrackerContext);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const history = useHistory();
  const formLayout = "vertical";
  const { register, trigger, formState: { errors }, setError, handleSubmit, clearErrors , setValue, getValues } = useForm();
  const {
    register: register2,
    trigger: trigger2,
    formState: { errors: errors2 },
    setError: setError2,
    handleSubmit: handleSubmit2,
    clearErrors: clearErrors2,
    setValue: setValue2,
    getValues: getValues2 
  } = useForm();
  let has_auth;
  
  const [visible, setVisible] = useState(false);
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

  const handleDeacConfChange = (e) => {
    clearErrors2();
    setValue2("deactivate_confirmation", e.target.value);
  }


  if (state.user.authenticated) {
    localStorage.setItem("ever_logged_in", true);
  }

  has_auth = localStorage.getItem("ever_logged_in");

  const profile1_message = () => {
    const info = message.warning({
      key: "profile1", content: "Please log in to edit account!", duration: 5.35, onClick: () => {info("profile1");}, className: "item-no-select",
    });
  };

  const profile2_message = () => {
    const info = message.info({
      key: "profile2", content: "Logged out!", duration: 3.55, onClick: () => {info("profile2");}, className: "item-no-select",
    });
  };

  if (!has_auth) {
    profile1_message();
    history.push("/accounts/login");
  }
  
  function post_logout() {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogout", 'POST', {})
    .then((json) => {
      dispatch({
        type: 'LOGGED_OUT'
      });
      profile2_message();
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

  useEffect(() => {
    register2("deactivate_confirmation", {
      required: "The confirmation password is required.",
    });
  }, [register2])

  function handleNotifClick(key) {
    post_logout();
    notification.close(key);
  }

  function handleNotifClickRemind(key) {
    localStorage.setItem(('no_remind_change_pwd' + state.user.id), true);
    notification.close(key);
  }

  const key = `open${Date.now()}`;
  const btn = (
    <Space direction="horizontal">
      <Button outline size="small" onClick={() => handleNotifClick(key)}>
        Log out
      </Button>
      <Button outline size="small" onClick={() => handleNotifClickRemind(key)}>
        Don't remind again
      </Button>
    </Space>
    
  );

  const openNotification = placement => {
    notification.success({
      message: 'Password Changed Successfully!',
      description:
        'Please log out to see the changes, and reload the site if necessary. \
        You can continue using the site without disruptions.\
         Click the X on the top right corner to log out later.',
      placement,
      btn,
      key,
      duration: 0,
    });
  };

  const [loadings, setloadings] = useState(false);
  const [disabledLoading, setDisabledLoading] = useState(false);

  let curpassref = React.useRef(null);
  let newpassref = React.useRef(null);
  let cfmpassref = React.useRef(null);

  function changeloading() {
    curpassref.current.blur();
    newpassref.current.blur();
    cfmpassref.current.blur();
    setloadings(true);
    setDisabledLoading(true);
    setTimeout(() => {
      setDisabledLoading(false);
      setloadings(false);
    }, 1630);
  }

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
        changeloading();
        setTimeout(() => {
          form.resetFields();
          if (JSON.parse(localStorage.getItem(('no_remind_change_pwd' + state.user.id))) !== true) {
            openNotification('topRight');
          } else {
            profile4_message();
          }
        }, 1630);
      }
    })
  }

  const profile3_message = (key) => {
    const info = message.success({
      key: key, content: "Account deactivated successfully!", duration: 3.55, onClick: () => {info(key);}, className: "item-no-select",
    });
  };

  const profile4_message = () => {
    const info = message.success({
      key: "profile4", content: "Password changed successfully!", duration: 3.55, onClick: () => {info("profile4");}, className: "item-no-select",
    });
  };

  function post_deactivate(data) {
    fetchData("http://127.0.0.1:8000/accounts/ajaxdeactivate", "POST", {
      "username": state.user.username,
      "password": data.deactivate_confirmation
    })
    .then((userdata) => {
      if (userdata.del_error) {
        Object.keys(userdata.del_error).forEach(key => {
          setError2(key, {
            type: "manual",
            message: userdata.del_error[key],
          });
        })
        trigger2("deactivate_confirmation");
      } else {
        dispatch({
          type: 'LOGGED_OUT'
        });
        setVisible(false);
        const key = 'deactivate_acc';
        message.loading({ content: 'Deactivating account...', key, className: "item-no-select", });
        setTimeout(() => {profile3_message(key);}, 1630);
        setTimeout(() => {history.push("/");}, 2130);
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
      hasFeedback: true,
      help: errors.new_password.message,
    })
  }

  let cfmPwdProps = {
    ...(errors.confirm_password && {
      validateStatus: "warning",
      hasFeedback: true,
      help: errors.confirm_password.message,
    })
  }

  let deacPwdProps = {
    ...(errors2.deactivate_confirmation && {
      validateStatus: "warning",
      hasFeedback: true,
      help: errors2.deactivate_confirmation.message,
    }),
    ...(errors2.inv_del_credentials && {
      validateStatus: "error",
      hasFeedback: true,
      help: "Invalid credentials provided",
    })
  }
  
  return (
    <div>
      <Row>
        <Col xs={1} sm={3} md={5} lg={6} xl={7}></Col>
        <Col xs={22} sm={18} md={14} lg={12} xl={10}>
          <Card className="profile-card-1">
            <Form layout={formLayout}>
              <Form.Item label={username_text}>
                <Input placeholder={state.user.username} disabled={true} className="profile-input-box"/>
              </Form.Item>
            </Form>
            <Divider/>
            <Form layout={formLayout} form={form} onFinish={handleSubmit(onSubmit)}>
              <Form.Item name="Current Password" label={current_password_text} {...curPwdProps}>
                <Input.Password ref={curpassref} className="profile-input-box" name="current_password" onChange={handleCurPwdChange} disabled={disabledLoading}/>
              </Form.Item>
              <Form.Item name="New Password" label="New Password" {...newPwdProps}>
                <Input.Password ref={newpassref} className="profile-input-box" name="new_password" onChange={handleNewPwdChange} disabled={disabledLoading}/>
              </Form.Item>
              <Form.Item name="Confirm Password" label="Confirm Password" {...cfmPwdProps}>
                <Input.Password ref={cfmpassref} className="profile-input-box" name="confirm_password" onChange={handleCfmPwdChange} disabled={disabledLoading}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" id={form} loading={loadings}>Change Password</Button>
              </Form.Item>
            </Form>
            <Divider/>
            <div>
              <Space direction="vertical" size={0} className="dialog-space">
                <Text>Delete Account</Text>
                <Text type="secondary">Permanently removes your account from the database (cannot be undone!)</Text>
              </Space>
              <br/>
              <Button danger onClick={() => {setVisible(true);}}>Delete Account</Button>
              <CollectionCreateForm
                visible={visible}
                onCreate={handleSubmit2(onSubmit1)}
                formName={form2}
                onCancel={() => {setVisible(false); clearErrors2(); form2.resetFields()}}
                onPwdChange={handleDeacConfChange}
                itemProps={deacPwdProps}
                forceRender
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default Profile;
