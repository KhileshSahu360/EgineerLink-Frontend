import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';

// const token2 = Cookie.get('connect.sid');
// console.log(token2);
let tokenFromLocal = localStorage.getItem('token');
tokenFromLocal = tokenFromLocal?true:false;
let tokenFromCookie;
const cookieString = document.cookie;
const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        tokenFromCookie = true;
        break;
      }
  }
  const token = tokenFromLocal || tokenFromCookie;
const authSlice = createSlice({
  name : 'authSlice',
  initialState : {status : token},
  reducers:{
    setIsLoggedInOrNot : (status,action)=>{

    }
  }
})

const store = configureStore({
  reducer : {
    authSlice : authSlice.reducer
  }
});

export default store;
export const authAction = authSlice.actions;