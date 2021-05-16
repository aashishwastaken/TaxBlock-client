import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import {useDispatch} from 'react-redux';
import {login} from './utils/authSlice';
import NewLoan from './components/NewLoan';



let routes = {
  login: Login,
  register: Register
}



function App() {
  
  let history = useHistory();
  let dispatch=useDispatch();

  useEffect(() => {
    async function checkLogedIn() {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');
      if (token) {
        let res = await axios.post('http://localhost:8081/users/isTokenValid', null, { headers: { 'Authorization': `Bearer ${token}` } });
        user = JSON.parse(user);

        if (res.data.success) {
          // console.log(res);
          dispatch(login({ user, token }));
        }
      }
    }
    checkLogedIn();
  }, [history,dispatch]);

  return (
    <BrowserRouter>
     
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          {Object.keys(routes).map(x => (<Route key={x} path={`/${x}`} component={Home} />))}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newloan" component={NewLoan} />
        </Switch>
     
    </BrowserRouter>
  );
}

export default App;
