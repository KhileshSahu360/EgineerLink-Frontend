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

const dataFetchedStatusSlice = createSlice({
  name : 'dataFetchedStatusSlice',
  initialState : {
    homeDataStatus : false,
    profileDataStatus : false,
    myNetworkDataStatus : false,
    messageDataStatus : false,
  },
  reducers:{
    setHomeDataStatus : (state, action) => {
      state.homeDataStatus = !action.payload;
    },
    setProfileDataStatus : (state, action) => {
      state.profileDataStatus = !action.payload;
    },
    setMessageDataStatus : (state, action) => {
      state.messageDataStatus = !action.payload;
    },
    setMyNetworkDataStatus : (state, action) => {
      state.myNetworkDataStatus = !action.payload;
    }
  }
})

const postSlice = createSlice({
  name : 'postSlice',
  initialState : {
    postData : [],
    isPostResult : false,
    isUserResult : false,
    userData : {},
    excludeIds : [],
    getOnlyUserData : false
  },
  reducers:{
    setPostData : (state, action) => {
      state.postData = action.payload;
    },
    setIsPostResult : (state, action) => {
      state.isPostResult = action.payload;
    },
    setIsUserResult : (state, action) => {
      state.isUserResult = action.payload;
    },
    setUserData : (state, action) => {
      state.userData = action.payload;
    },
    setExcludeIds : (state, action) => {
      state.userData = action.payload;
    },
    setGetOnlyUserData : (state, action) => {
      state.getOnlyUserData = !action.payload;
    }
  }
})

const myNetworkSlice = createSlice({
  name : 'myNetworkSlice',
  initialState : {
    localUserData : null,
    allUserDataForPeople : null
  },
  reducers:{
    setLocalUserData : (state, action) => {
      state.localUserData = action.payload;
    },
    setAllUserDataForPeople : (state, action) => {
      state.allUserDataForPeople = action.payload;
    }
  }
})

const messageSlice = createSlice({
  name : 'messageSlice',
  initialState : {
    filterChatList : null,
    lastMessage : []
  },
  reducers:{
    setFilterChatList : (state, action) => {
      console.log(action.payload.length,"filter store")
      state.filterChatList = action.payload;
    },
    setLastMessage : (state, action) => {
      console.log(action.payload.length,"lastmessage store")
      state.lastMessage = action.payload;
    }
  }
})

const persistConfig = {
  key : 'root',
  storage,
  blacklist: ['dataFetchedStatusSlice', 'postSlice', 'myNetworkSlice', 'messageSlice'],
};

const rootReducer = combineReducers({
  userDetailSlice : userDetailSlice.reducer,
  socketSlice : socketSlice.reducer,
  dataFetchedStatusSlice : dataFetchedStatusSlice.reducer,
  postSlice : postSlice.reducer,
  myNetworkSlice : myNetworkSlice.reducer,
  messageSlice : messageSlice.reducer
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
export const dataFetchedStatusAction = dataFetchedStatusSlice.actions;
export const postAction = postSlice.actions;
export const myNetworkAction = myNetworkSlice.actions;
export const socketAction = socketSlice.actions;
export const messageAction = messageSlice.actions;