import React, { useContext, useEffect } from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from 'antd';
import jQuery from "jquery";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { NTTrackerContext } from "../nttracker/context.js";
import './login-dom.css';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}


function fetchData(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status === 400) {
      return response.json()
      .then((json) => {
        return Promise.reject(json);
      })
    } else {
      return response.json();
    }
  });
}


function Login() {
  const onSubmit = values => {post_login(values);}
  const [state, dispatch] = useContext(NTTrackerContext);
  const history = useHistory();

  const { register, trigger, formState: { errors }, setError, handleSubmit, clearErrors , setValue } = useForm();

  // fix clearerrors: should not both be elimitnated (e.g. blank input)
  const handleUsernameChange = (e) => {
    clearErrors();
    setValue("username", e.target.value);
    trigger('username');
    trigger('password');
  }

  const handlePasswordChange = (e) => {
    clearErrors();
    setValue("password", e.target.value);
    trigger('username');
    trigger('password');
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
    console.log("CSRF:", getCookie('csrftoken'))
    fetchData("http://127.0.0.1:8000/accounts/ajaxlogin", 'POST', {'username': data.username, 'password': data.password})
    .then((userdata) => {
      if (userdata.errors) {
        Object.keys(userdata.errors).forEach(key => {
          setError(key, {
            type: "manual",
            message: userdata.errors[key],
          });
        })
      } else {
        dispatch({
          type: 'LOGGED_IN', userdata,
        });
        history.push("/");
      }
    })
    // .catch((json) => setNoNameError(JSON.stringify(json)));
  }

  let usernameProps = {
    ...(errors.username && {
      validateStatus: 'warning',
      hasFeedback: true,
      help: errors.username.message,
    }),
    ...(errors.inv_credentials && {validateStatus: 'error', hasFeedback: true,})
  }

  let passwordProps = {
    ...(errors.password && {
      validateStatus: 'warning',
      hasFeedback: true,
      help: errors.password.message,
    }),
    ...(errors.inv_credentials && {
      validateStatus: 'error',
      hasFeedback: true,
      help: 'Invalid credentials provided',
    })
  }

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "380px", padding: "30px" }}>
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="/accounts/forgot-password" key="signup">Forgot password</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/accounts/signup" key="signup">register now!</Link>
        </Form.Item>
      </Form> 
    </div>
  )
}

export default Login;