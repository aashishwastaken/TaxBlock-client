import {createSlice} from '@reduxjs/toolkit';

export const authSlice=createSlice({
    name:'auth',
    initialState: {
      isAuthenticated: false,
      user: null,
      token: null
    },
    reducers:{
      login:(state,action)=>{
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        state.isAuthenticated=true;
        state.user= action.payload.user;
        state.token= action.payload.token;
        
      },
      logout:(state)=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        state.isAuthenticated= false;
        state.user= null;
        state.token= null;
        }
      }
    

});

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;
