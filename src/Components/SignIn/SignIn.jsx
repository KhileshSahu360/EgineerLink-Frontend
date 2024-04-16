import React, { useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import { Link } from 'react-router-dom'
import './SignIn.css'
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import Alerts from '../Alert/Alert';
import Toastify from '../Toastify/Toastify';
import { ErrorToastify } from '../Toastify/Toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [tokenError,setTokenError] = useState(false);
  const [isSigninSuccess,setIsSigninSuccess] = useState(false);
  const [emailNotMatch,setEmailNotMatch] = useState(false);
  const [passNotMatch,setPassNotMatch] = useState(false);
  const [unsuccessSignin,setUnsuccessSignin] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const[emptyAlert,setEmptyAlert] = useState(false);
  const[incorrectAlert,setIncorrectAlert] = useState(false);
  const[isPassShowed,setIsPassShowed] = useState(false)
  const falseToastify = () => {
    setTokenError(false);
    setIsSigninSuccess(false);
    setEmailNotMatch(false);
    setPassNotMatch(false);
    setUnsuccessSignin(false);
  }
  const eyesClick = () => {
    if(passwordRef.current.type === 'password'){
      passwordRef.current.type = 'text';
      setIsPassShowed(true)
      passwordRef.current.focus();
    }else{
      passwordRef.current.type = 'password';
      passwordRef.current.focus();
      setIsPassShowed(false)
    }
  }
  const submitHandler = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(email.length>0 && password.length>0){
        try{
          setLoading(true)
          let response = await fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
          })
          response = await response.json();
          if(response.status === true){
            localStorage.setItem('token',response.token);
            setIsSigninSuccess(true);
            setTimeout(()=>{
              navigate('/');
            },1000)
          }
          if(response.error === 'email error'){
            setLoading(false);
            setEmailNotMatch(true);
          }else if(response.error === 'password error'){
            setLoading(false);
            setPassNotMatch(true);
          }else if(response.error === 'token'){
            setTokenError(true)
          }
        }catch(err){
          console.log(err)
          setLoading(false);
          setUnsuccessSignin(true);
        }
    }else{
      setEmptyAlert(true);
    }
  }
  return (
<div className=' h-full flex flex-col gap-5 justify-center items-center sign_in'>
  <div>
    <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt=""/>
  </div>
  <div>
    <h1 className='font-bold'>Sign in to Engineer Link</h1>
  </div>
  {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
  {incorrectAlert && <Alerts types={'error'} msg={'Incorrect email id or password!'} status={setIncorrectAlert}/>}
  <form onSubmit={submitHandler}className='signin_form h-auto gap-2 p-5 border-2 rounded-md bg-white flex flex-col'>
    <span>Email</span>
    <input type="email" ref={emailRef}  className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    <div className='flex justify-between'>
      <span>Password</span>
      <span><Link to='/signin/sendmail' className='text-blue-600 hover:underline'>Forgot password</Link></span>
    </div>
    <div className="password relative">
      <input type="password" ref={passwordRef}  className='rounded-lg p-1 w-full pr-8 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
      {isPassShowed?<IoEyeSharp onClick={eyesClick} className='open_eye absolute top-2.5 right-3 cursor-pointer text-gray-800'/>:
      <HiMiniEyeSlash onClick={eyesClick} className='close_eye absolute top-2.5 right-3 cursor-pointer text-gray-800'/>}
      
    </div>
    <button type='submit' className='w-full bg-mainColor mt-4 p-2 rounded-lg text-white font-bold'>{loading?<Loader color={'white'}/>:"Sign in"}</button>
    <span className='inline-block text-center mt-1 newto_account'>
      New to Engineer Link? <Link to='/signup' className='text-blue-600 hover:underline'>Create an account</Link>
    </span>
    {isSigninSuccess && <Toastify deActivate={falseToastify} time={1000} msg={'Congratulation! Sign in successfully'}/>}
    {emailNotMatch && <ErrorToastify time={3000} deActivate={falseToastify} msg={'Incorrect email id!'}/>}
    {passNotMatch && <ErrorToastify time={3000} deActivate={falseToastify} msg={'Incorrect password!'}/>}
    {unsuccessSignin &&  <ErrorToastify time={3000} deActivate={falseToastify} msg={'Something wrong! Try Again'}/>}
    {tokenError &&  <ErrorToastify time={3000} deActivate={falseToastify} msg={'Please try After some times!'}/>}
  </form>
  <span>OR</span>
</div>

  )
}

export default SignIn
