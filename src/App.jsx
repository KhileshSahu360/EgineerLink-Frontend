import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import MainPageCont from './Components/Main/MainPageCont'
import { Outlet } from 'react-router-dom'
import SignIn from './Components/SignIn/SignIn'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userDetailAction } from './Components/Store/Store'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


let actualToken;
let tokenFromLocal = localStorage.getItem('token');
const isTokenFromLocal = tokenFromLocal?true:false;
if(isTokenFromLocal){
  actualToken = tokenFromLocal;
}
const cookieString = document.cookie;
let isTokenFromCookie;
const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        actualToken = value;
        isTokenFromCookie = true;
        break;
      }
  }
  let isUserAuthentic;
  const isTokenValid = async() => {
    const rawResponse = await fetch('http://localhost:3000/istokenvaid',{
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${actualToken}`
      }
    })
    const response = await rawResponse.json();
    let user;
    if(!response.error){
      user = response.user;
      if(user){
        localStorage.removeItem('v09userInfoId');
        localStorage.removeItem('v09userInfoName');
        localStorage.setItem('v09userInfoId',user._id);
        localStorage.setItem('v09userInfoName',user.name);
        dispatch(userDetailAction.setDetail(user));
        
      }else{
        localStorage.removeItem('v09userInfoId');
        localStorage.removeItem('v09userInfoName');
      }
    }else{
      localStorage.removeItem('v09userInfoId');
      localStorage.removeItem('v09userInfoName');
      navigate('/signin');
    }
  }
  console.log(import.meta.env.VITE_HII)
  useEffect(()=>{
    isTokenValid();
  },[])
  return (
    <>
        <div className='min-h-screen pb-4 bg-bgColor App'>
          <Outlet/>
        </div>
    </>
  )
}

export default App
