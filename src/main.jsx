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

const router = createBrowserRouter(
  [
    {path : '/', element : <App/>,
    children:[
      {path : '/signin',element : <SignIn/>},
      {path : '/signup',element : <SignUp/>},
      {path : '/signin/sendmail',element : <SendMail/>},
      {path : '/accountactivation',element : <AccountActivation/>},
      {path : '/resetpassword',element : <ResetPassword/>},
      {path : '/',element:<MainPageCont/>,
       children:[
          {path : '/', element:<Home/>},
          {path : '/mynetwork', element:<MyNetwork/>},
          {path : '/collabcoding', element:<CollabCoding/>},
          {path : '/notifications', element:<Notifications/>},
          {path : '/message', element:<Message/>},
          {path : '/profile', element:<Profile/>},
        ]
      }      
    ]
  }   
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}>
              <App />
          </RouterProvider>
      </Provider>
  </React.StrictMode>,
)
