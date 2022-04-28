import React, { useState } from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../../_actions/user_action';
import { Form, Button } from 'react-bootstrap';
// import { Form, Input, Button, Checkbox, Typography } from 'antd';
// import Icon from '@ant-design/icons';
import Auth from '../../../hoc/auth';

function LoginPage(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
            alert('Error˝')
          }
      })
   
  }

  console.log('yogida1');
  return (
    <Form onSubmit={onSubmitHandler}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={Email} onChange={onEmailHandler} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login 
      </Button>
    </Form>
  )
}

export default Auth(LoginPage, false);

  //   <div style={{
  //     display: 'flex', justifyContent: 'center', alignItems: 'center'
  //     , width: '100%', height: '100vh'
  // }}>
  //     <form style={{ display: 'flex', flexDirection: 'column' }}
  //         onSubmit={onSubmitHandler}
  //     >
  //         <label>Email</label>
  //         <input type="email" value={Email} onChange={onEmailHandler} /> 
  //         <label>Password</label>
  //         <input type="password" value={Password} onChange={onPasswordHandler} />
  //         <br />
  //         <button type="submit">
  //             Login
  //         </button>
  //     </form>
  // </div>