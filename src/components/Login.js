import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Group from '@material-ui/icons/Group';
import { useDispatch } from 'react-redux';

import { login } from '../utils/authSlice';
import baseUrl from '../utils/baseUrl';




export default function Login() {

  const dispatch = useDispatch();
  let history = useHistory();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState(null);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let userInput = { email, password };
    try {
      let { data: res } = await axios.post(baseUrl+"users/login", userInput);
      // console.log(res);
      if (res.success) {
        dispatch(login({
          user: {
            name: res.user.name,
            email: res.user.email
          },
          token: res.user.token
        }
        ));

        history.push('/dashboard');
      }
      else {
        setErrors(res.message);
      }
    } catch (err) {
      setErrors(err.response.data.msg);
    }
  }

  return (
    <div className="col">
      <h2>Login Form</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="imgcontainer">
          <Group style={{ fontSize: '5em', color: '#3284d1' }} />
        </div>

        <div className="container">
          <p className="danger" >{errors && `Error: ${errors}`}</p>
          <label htmlFor="uname"><b>Email</b></label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="password" required />

          <button type="submit" className="button-login" >Login </button>
          <p id="or"> OR</p>

        </div>


      </form>
      <button id="reserve-button" className="button-login" onClick={() => history.push('/register')} >Register</button>
    </div>
  )
}
