import React, { useContext, useEffect, useState } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Tooltip, message, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { NTTrackerContext } from "../nttracker/context.js";
import fetchData from "../common/utilities.js";
import "./login-dom.css";


function Login() {
  const onSubmit = values => {post_login(values);}
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();
  const { register, trigger, formState: { errors }, setError, handleSubmit, clearErrors , setValue } = useForm();

  const handleUsernameChange = (e) => {
    clearErrors();
    setValue("username", e.target.value);
  }

  const handlePasswordChange = (e) => {
    clearErrors();
    setValue("password", e.target.value);
  }

  const [loadings, setloadings] = useState(false);

  function changeloading() {  
    setloadings(true);
    setTimeout(() => {
      setloadings(false);
    }, 6000);
  }

  function handleRememberChange(e) {
    localStorage.setItem("remember_user", e.target.checked);
  }

  // add regex validation later
  useEffect(() => {
    register("username", {
      required: "The username is required.",
      pattern: {
        value: /^[A-Za-z0-9@.+-_]+$/i,
        message: "Letters, digits and @/./+/-/_ only.",
      },
      maxLength: {
        value: 150,
        message: "There can only be 150 characters or fewer."
      },
    }); 
    register("password", {required: "The password is required."});
  }, [register])

  function post_login(data) {
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogin", "POST", {"username": data.username, "password": data.password})
    .then((userdata) => {
      if (userdata.errors) {
        Object.keys(userdata.errors).forEach(key => {
          setError(key, {
            type: "manual",
            message: userdata.errors[key],
          });
        })
        trigger("username");
        trigger("password");
      } else {
        dispatch({
          type: "LOGGED_IN", userdata,
        });
        changeloading();  
        setTimeout(() => {message.success("Log in successful!", 3.55);}, 2130);
        setTimeout(() => {history.push("/");}, 2130);
      }
    })
    // .catch((json) => setNoNameError(JSON.stringify(json)));
  }

  let usernameProps = {
    ...(errors.username && {
      validateStatus: "warning",
      help: errors.username.message,
    }),
    ...(errors.inv_credentials && {validateStatus: "error", hasFeedback: true,})
  }

  let passwordProps = {
    ...(errors.password && {
      validateStatus: "warning",
      help: errors.password.message,
    }),
    ...(errors.inv_credentials && {
      validateStatus: "error",
      hasFeedback: true,
      help: "Invalid credentials provided",
    })
  }

  if (state.user.is_authenticated) {
    message.info("Already authenticated, smarty", 3.55);
    history.push("/accounts/profile");
  } else {
    return (
      <div>
        <Card className="home-card">
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)} requiredMark={false}>
            <Form.Item name="Username" {...usernameProps}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                name="username" onChange={handleUsernameChange}/>
            </Form.Item>
            <Form.Item name="Password" {...passwordProps}>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"
                name="password" onChange={handlePasswordChange} />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Tooltip placement="left" title="Don't check if you want to be logged out on browser close.">
                  <Checkbox onChange={handleRememberChange}>Remember me</Checkbox>
                </Tooltip>
              </Form.Item>
              <Tooltip placement="right" title="Please contact the site owner for more information.">
                <span className="login-form-forgot">Forgot password?</span>
              </Tooltip>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loadings}>
                Log in
              </Button>
            </Form.Item>
          </Form> 
        </Card>
      </div>
    )
  }
}


export default Login;
