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
import { BarLoader } from './Components/Loader/Loader';
import LinkIcon from './assets/logo/LinkLogo.svg'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

const backend_url = import.meta.env.VITE_BACKEND_URL;

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
    setLoading(true);
    const rawResponse = await fetch(`${backend_url}istokenvalid`,{
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
    setResult(true);
    setLoading(false);
  }
  useEffect(()=>{
    if(actualToken){
      isTokenValid();
    }else{
      setResult(true);
      setLoading(false);
      navigate('/signin');
    }
  },[])
  return (
    <>
        <div className='min-h-screen pb-4 bg-bgColor App'>
          {!loading ? result && <Outlet/>:<div className='min-h-screen p-0 flex flex-col gap-4 justify-center items-center'>
              <img src={LinkIcon} alt="" />
              <BarLoader color={'#b200b5'}/>
            </div>
          }
        </div>
    </>
  )
}

export default App
