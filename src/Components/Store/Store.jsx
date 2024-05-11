import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";



// data fetching section 
const ProfileData  = () => {
  
}


// authentication token taking from localStorage
const userDetailSlice = createSlice({
  name : 'userDetailSlice',
  initialState : {},
  reducers:{
    setIdandName : (status,action)=>{
      const userId = action.payload.id; 
      const username = action.payload.username;
      return {userId, username};
    }
  }
})
// profile page data



const store = configureStore({
  reducer : {
    userDetailSlice : userDetailSlice.reducer
  }
});

export default store;
export const userDetailAction = userDetailSlice.actions;