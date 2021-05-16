import React, {  useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';

export default function Home() {

    const loggedin = useSelector(state => state.auth.isAuthenticated);
    let history=useHistory();
    
    useEffect(() => {
        if(loggedin){
            history.push('/dashboard');
        }
    }, [history,loggedin]);
   
    
    return (

        <div className="side-image" >
            
            <div id="auth">
                {(useLocation().pathname==='/login')?<Login />:<Register />}
            </div>
        </div>

    )
}
