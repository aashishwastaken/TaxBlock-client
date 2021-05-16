import axios from 'axios';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PersonAdd from '@material-ui/icons/PersonAdd';
import {login} from '../utils/authSlice';
import baseUrl from '../utils/baseUrl';

export default function Register() {
    const dispatch=useDispatch();
    let [email,setEmail]=useState('');
    let [name,setName]=useState('');
    let [address,setAddress]=useState('');
    let [contact,setContact]=useState('');
    let [password,setPassword]=useState('');
    let [cpassword,setCpassword]=useState('');
    let [errors,setErrors]=useState(null);
    let history=useHistory();

    let handleSubmit=async (e)=>{
      e.preventDefault();
        let userInput={name,email,address, contact, password,cpassword};
        try{
        let {data:res}=await axios.post(baseUrl+"users/register",userInput);
        // console.log(res);
        if(res.success){
          dispatch(login({user:{name:res.user.name,
                                email:res.user.email
                              },
                          token:res.user.token
                        }
                      ));
          history.push('/dashboard');
        }
        else{
          setErrors(res.message);  
        }
        }catch(err){
          setErrors(err.response.data.msg);
        }
    }
    
    return (
        <div className=" col">
            <h2>Register Form</h2>

<form onSubmit={(e)=>handleSubmit(e)}>
  <div className="imgcontainer">
  <PersonAdd style={{fontSize:'5em', color:'#3284d1'}} />
  </div>

  <div className="container">
  <p className="danger" >{errors && `Error: ${errors}`}</p>

     <label htmlFor="name"><b>Name</b></label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" name="name" required />
   
    <label htmlFor="email"><b>Email</b></label>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" name="email" required />

    <label htmlFor="address"><b>Address</b></label>
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address" name="address" required />

    <label htmlFor="contact"><b>Contact No.</b></label>
    <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Enter Contact No." name="contact" required />

    <label htmlFor="password"><b>Password</b></label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" name="password" required />

    <label htmlFor="cpassword"><b>Confirm Password</b></label>
    <input type="password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder="Enter Confirm Password" name="cpassword" required />
        
    <button type="submit" className="button-login" >Register </button>
  <p id="or"> OR</p>
  </div>


</form>
<button id="reserve-button" className="button-login" onClick={()=>history.push('/login')} >Login</button>
        </div>
    )
}
