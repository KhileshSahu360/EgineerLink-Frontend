import React, { useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import { Link } from 'react-router-dom'
import '../SignIn/SignIn.css'
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import Alerts from '../Alert/Alert';
import Toastify from '../Toastify/Toastify';
import { ErrorToastify } from '../Toastify/Toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import googleLogo from '../../assets/logo/googleLogo.png';


const SignUp = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [isSignupSuccess,setIsSignupSuccess] = useState(false);
  const [existError,setExistError] = useState(false);
  const [unsuccessSignup,setUnsuccessSignup] = useState(false);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const[isPassShowed,setIsPassShowed] = useState(false)
  const[emptyAlert,setEmptyAlert] = useState(false);
  const[notMatchAlert,setNotMatchAlert] = useState(false);
  const[passLengthAlert,setPassLengthAlert] = useState(false);

  const falseToastify = () => {
    setIsSignupSuccess(false);
    setUnsuccessSignup(false);
    setExistError(false)
  }
  const eyesClick = () => {
    if(confirmPasswordRef.current.type === 'password'){
      confirmPasswordRef.current.type = 'text';
      setIsPassShowed(true)
      confirmPasswordRef.current.focus();
    }else{
      confirmPasswordRef.current.type = 'password';
      confirmPasswordRef.current.focus();
      setIsPassShowed(false)
    }
  }
  const submitHandler = async(event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if(name.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0){
      if(password.length>=8){
        if(password === confirmPassword){
          setLoading(true);
          try{
            let response = await fetch('http://localhost:3000/signup',{
              method:'post',
              headers:{                                                                       
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({name,email,password})
            })
            response = await response.json();
            // console.log(response);
            if(response.status === true){
              nameRef.current.value = '';
              emailRef.current.value = '';
              passwordRef.current.value = '';
              confirmPasswordRef.current.value = '';
              setIsSignupSuccess(true);
              setLoading(false);

            }else if(response.error ==='exist'){
              setExistError(true)
              setLoading(false);
            }else{
              setLoading(false);
              setUnsuccessSignup(true);
            }
          }catch(err){
            setLoading(false);
            setUnsuccessSignup(true)
          }
        }else{
          setNotMatchAlert(true)
        }
      }else{
        setPassLengthAlert(true)
      }
    }else{
      if(name.length===0) nameRef.current.focus();
      else if(email.length===0)emailRef.current.focus();
      else if(password.length===0)passwordRef.current.focus();
      else if (confirmPassword.length===0)confirmPasswordRef.current.focus();
      setEmptyAlert(true);
    }
  }
  return (
<div className=' h-[100vh] flex flex-col gap-5 justify-center items-center sign_up'>
  <div>
    <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt=""/>
  </div>
  {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
  {passLengthAlert && <Alerts types={'error'} msg={'Password must be greater than 8 characters!'} status={setPassLengthAlert}/>}
  {notMatchAlert && <Alerts types={'error'} msg={'Passwod did not match! Please check it!'} status={setNotMatchAlert}/>}
  <form onSubmit={submitHandler} className='signup_form h-auto gap-1 p-4 px-7 border-2 rounded-md bg-white flex flex-col'>
    <span>Name</span>
    <input type="text" ref={nameRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    <span>Email</span>
    <input type="email" ref={emailRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    <span>Password</span>
      <input type="password" ref={passwordRef} className='rounded-lg p-1 w-full pr-8 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    <span>Confirm Password</span>
    <div className="password relative">
      <input type="password" ref={confirmPasswordRef} className='rounded-lg p-1 w-full pr-8 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
      {isPassShowed?<IoEyeSharp onClick={eyesClick} className='open_eye absolute top-2.5 right-3 cursor-pointer text-gray-800'/>:
      <HiMiniEyeSlash onClick={eyesClick} className='close_eye absolute top-2.5 right-3 cursor-pointer text-gray-800'/>}
      
    </div>
    <button type='submit' className='w-full bg-mainColor mt-3 p-2 rounded-lg text-white font-bold'>{loading?<Loader color={'white'}/>:"Sign up"}</button>
    <span className='inline-block text-center  newto_account'>
      I have already created account? <Link to='/signin' className='text-blue-600 hover:underline'>Sign in</Link>
    </span>
    {isSignupSuccess && <Toastify deActivate={falseToastify} time={10000} msg={'Verify Your Email!'}/>}
    {unsuccessSignup &&  <ErrorToastify deActivate={falseToastify} time={3000} msg={'Something wrong! Try Again'}/>}
    {existError &&  <ErrorToastify deActivate={falseToastify} time={3000} msg={'Email is already exist!'}/>}
  </form>
  <span>OR</span>
  <div className="relative w-[90%] flex justify-center">
    <button className='w-[90%] border-2 border-black mt-4 p-2 pl-5 rounded-lg text-black font-medium' ><a href="http://localhost:3000/auth/google"><img src={googleLogo} alt="google" className="h-[1rem] absolute top-[50.5%] left-[23%]"/> Login with Google</a></button>
  </div>
</div>

  )
}

export default SignUp
