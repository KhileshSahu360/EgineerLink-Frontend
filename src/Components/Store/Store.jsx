import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

// authentication token taking from localStorage
const userDetailSlice = createSlice({
  name : 'userDetailSlice',
  initialState : {
    user : null,
    selectedUser : null,
    onlineUsers : null,
  },
  reducers:{
    setDetail : (state,action)=>{
      state.user = action.payload;
    },
    setSelectedUser : (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers : (state, action) => {
      state.onlineUsers = action.payload;
    }
  }
})
const socketSlice = createSlice({
  name : 'socketSlice',
  initialState : {
    socket : null
  },
  reducers:{
    setSocket : (state, action) => {
      state.socket = action.payload;
    }
  }
})

const persistConfig = {
  key : 'root',
  storage
};

const rootReducer = combineReducers({
  userDetailSlice : userDetailSlice.reducer,
  socketSlice : socketSlice.reducer
})

let persistReducers = persistReducer(persistConfig, rootReducer);
// data fetching section 


// profile page data



const store = configureStore({
  reducer : persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const userDetailAction = userDetailSlice.actions;
export const socketAction = socketSlice.actions;