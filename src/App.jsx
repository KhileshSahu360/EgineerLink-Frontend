import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import MainPageCont from './Components/Main/MainPageCont'
import { Outlet } from 'react-router-dom'
import SignIn from './Components/SignIn/SignIn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authAction } from './Components/Store/Store'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkToken = async() => {
    let response = await fetch('',{
      headers:{

      }
    })
    response = await response.json();

  }
  const { status } = useSelector((store)=>store.authSlice);
  useEffect(()=>{
    if(!status){
      navigate('/signin');
    }
  },[])
  return (
    <>
        <div className='h-screen bg-bgColor App'>
          <Outlet/>
        </div>
    </>
  )
}

export default App
