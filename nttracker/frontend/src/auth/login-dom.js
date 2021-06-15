import React, { useContext, useEffect, useState } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Tooltip, message, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { NTTrackerContext } from "../nttracker/context.js";
import { fetchData, fetchData_csrf } from "../common/utilities.js";
import "./login-dom.css";


function Login() {
  //////////////////////////
  // PART 1: Form Control //
  //////////////////////////
  const onSubmit = values => {post_login(values);}
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const {
    register, trigger, formState: { errors }, setError, handleSubmit, clearErrors , setValue
  } = useForm();

  const handleUsernameChange = (e) => {
    clearErrors(); setValue("username", e.target.value);
  }
  const handlePasswordChange = (e) => {
    clearErrors(); setValue("password", e.target.value);
  }

  useEffect(() => {
    register("username", {
      required: "The username is required.",
      pattern: {
        value: /^[A-Za-z0-9@.+-_]+$/i, message: "Letters, digits and @/./+/-/_ only.",
      },
      maxLength: {
        value: 150, message: "There can only be 150 characters or fewer."
      },
    }); 
    register("password", {required: "The password is required."});
  }, [register])


  /////////////////////////
  // PART 2: Input Props //
  /////////////////////////
  const [loadings, setloadings] = useState(false);
  const [disabledLoading, setDisabledLoading] = useState(false);

  let usernameref = React.useRef(null);
  let passwordref = React.useRef(null);

  function changeloading() {
    usernameref.current.blur();
    passwordref.current.blur();
    setloadings(true);
    setDisabledLoading(true);
    setTimeout(() => {setloadings(false);}, 1630);
  }
  
  let usernameProps = {
    ...(errors.username && {
      validateStatus: "warning", hasFeedback: true, help: errors.username.message,
    }),
    ...(errors.inv_credentials && {validateStatus: "error", hasFeedback: true,})
  }

  let passwordProps = {
    ...(errors.password && {
      validateStatus: "warning", hasFeedback: true, help: errors.password.message,
    }),
    ...(errors.inv_credentials && {
      validateStatus: "error", hasFeedback: true, help: "Invalid credentials provided",
    })
  }

  ///////////////////////////
  // PART 3: Local Storage //
  ///////////////////////////
  function handleRememberChange(e) {
    localStorage.setItem("remember_user", e.target.checked);
  }
  localStorage.setItem("login_yet", false);

  /////////////////////
  // PART 4: Message //
  /////////////////////
  function login1_message() {
    const info = message.success({
      key: "login1",
      content: "Logged in successfully!",
      duration: 3.55,
      onClick: () => {info("login1");},
      className: "item-no-select",
    });
    setTimeout(() => {
      localStorage.setItem("login_yet", true);
    }, 3550);
  };

  function login2_message() {
    const info = message.info({
      key: "login2",
      content: "Already authenticated, smarty",
      duration: 3.55,
      onClick: () => {info("login2");},
      className: "item-no-select",
    });
  };
  if (JSON.parse(localStorage.getItem('login_yet')) === true) {
    login2_message();
    history.push('/');
  }

  ////////////////////////////
  // PART 5: Post Functions //
  ////////////////////////////
  function post_login(data) {
    fetchData(
      "http://127.0.0.1:8000/accounts/ajaxlogin",
      "POST",
      {"username": data.username, "password": data.password}
    )
    .then((userdata) => {
      if (userdata.errors) {
        Object.keys(userdata.errors).forEach(key => {
          setError(key, {type: "manual", message: userdata.errors[key],});
        })
        trigger("username");
        trigger("password");
      } else {
        changeloading();  
        setTimeout(() => {
          dispatch({type: "LOGGED_IN", userdata,}); login1_message();
        }, 1630);
        setTimeout(() => {history.push("/");}, 2130);
      }
    })
  }

  return (
    <div>
      <Card className="home-card">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)} requiredMark={false}>
          <Form.Item name="Username" {...usernameProps} disabled={disabledLoading}>
            <Input
              ref={usernameref}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username" 
              name="username"
              onChange={handleUsernameChange}
              disabled={disabledLoading}
            />
          </Form.Item>
          <Form.Item name="Password" {...passwordProps} disabled={disabledLoading}>
            <Input.Password
              ref={passwordref}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password" 
              onChange={handlePasswordChange}
              disabled={disabledLoading}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Tooltip
                placement="left"
                title="Don't check if you want to be logged out on browser close."
              >
                <Checkbox onChange={handleRememberChange} disabled={disabledLoading}>
                  Remember me
                </Checkbox>
              </Tooltip>
            </Form.Item>
            <Tooltip
              placement="right"
              title="Please contact the site owner for more information."
            >
              <span className="login-form-forgot">Forgot password?</span>
            </Tooltip>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loadings}
            >
              Log in
            </Button>
          </Form.Item>
        </Form> 
      </Card>
    </div>
  )
}


export default Login;
