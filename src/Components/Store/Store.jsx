import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

// localStorage.setItem('user','Khilesh');
// localStorage.removeItem('user')



const token = localStorage.getItem('token');
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