import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import MyNetwork from './Components/MyNetwork/MyNetwork.jsx';
import CollabCoding from './Components/CollabCoding/CollabCoding.jsx';
import Notifications from './Components/Notifications/Notifications.jsx';
import Message from './Components/Message/Message.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Home from './Components/Home/Home.jsx';
import MainPageCont from './Components/Main/MainPageCont.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import { Provider } from 'react-redux';
import store from './Components/Store/Store.jsx';
import ResetPassword from './Components/VerifyEmail/ResetPassword.jsx';
import SendMail from './Components/VerifyEmail/SendMail.jsx';
import AccountActivation from './Components/VerifyEmail/AccountActivation.jsx';
import ServerError from './Components/Error/ServerError.jsx';
import SeePost from './Components/Post/SeePost.jsx';
import NotFound from './Components/NotFound.jsx';
import SeeUserProfile from './Components/Profile/SeeUserProfile.jsx';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

const router = createBrowserRouter(
  [
    {path : '/accountactivation/:id/:token',element : <AccountActivation/>},
    {path : '/resetpassword/:id/:token',element : <ResetPassword/>},
    {path : '/', element : <App/>,
    children:[
      {path : '/signin',element : <SignIn/>},
      {path : '/signup',element : <SignUp/>},
      {path : '/signin/sendmail',element : <SendMail/>},
      {path : '/resetpassword',element : <ResetPassword/>},
      {path : '/',element:<MainPageCont/>,
       children:[
          {path : '/', element:<Home/>},
          {path : '/seepost/:postId/:localUserId', element:<SeePost/>},
          {path : '/mynetwork', element:<MyNetwork/>},
          {path : '/seeuserprofile/:userIdToSee', element:<SeeUserProfile/>},
          {path : '/collabcoding', element:<CollabCoding/>},
          {path : '/notifications', element:<Notifications/>},
          {path : '/message', element:<Message/>},
          {path : '/profile', element:<Profile/>},
          {path : '/404error', element:<NotFound/>},
          {path : '/servererror',element : <ServerError/>},
          {path : '*', element:<NotFound/>},
        ]
      }      
    ]
  }   
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router}>
              <App />
          </RouterProvider>
        </PersistGate>
      </Provider>
  </React.StrictMode>,
)
