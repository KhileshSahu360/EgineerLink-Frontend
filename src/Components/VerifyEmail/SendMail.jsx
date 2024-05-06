import React, { useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Loader from '../Loader/Loader';
import '../SignIn/SignIn.css'
import Alerts from '../Alert/Alert';
import Toastify from '../Toastify/Toastify';
import { ErrorToastify } from '../Toastify/Toastify';

const SendMail = () => {
  const emailRef = useRef('');
  const [loading,setLoading] = useState(false);
  const [emptyAlert,setEmptyAlert] = useState(false);
  const [success,setSuccess] = useState(false);
  const [exist,setExist] = useState(false);
  const [wrong,setWrong] = useState(false);
  const falseToastify = () => {
    setEmptyAlert(false);
    setSuccess(false);
    setExist(false);
    setWrong(false);
  }
  const submitHandler = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    if(email.length > 0){
      let response = await fetch('http://localhost:3000/tokenauth/sendmailforresetpass',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email})
      });
      response = await response.json();
      if(response.status===true){
        setSuccess(true)
      }else if(response.status===false){
        setExist(true);
      }else{
        setWrong(true);
      }
    }else{
      setEmptyAlert(true);
      emailRef.current.focus();
    }
  }
  return (
    <div className=' h-full flex flex-col gap-5 justify-center items-center sign_up'>
      <div>
        <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt=""/>
      </div>
        {emptyAlert && <Alerts types={'error'} msg={'Please fill the email Field!'} status={setEmptyAlert}/>}
      <form onSubmit={submitHandler} className='verifyemail_form h-auto gap-1 p-5 px-7 border-2 rounded-md bg-white flex flex-col'>
        <span>Email</span>
        <input type="email" ref={emailRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
        <button type='submit' className='w-full bg-mainColor mt-3 p-2 rounded-lg text-white font-bold'>{loading?<Loader color={'white'}/>:"Send mail"}</button>
      </form>
      {success && <Toastify deActivate={falseToastify} time={5000} msg={'Reset link is sent to your email'}/>}
      {exist && <ErrorToastify time={3000} deActivate={falseToastify} msg={'Email is not exist!'}/>}
      {wrong && <ErrorToastify time={3000} deActivate={falseToastify} msg={'Something went wrong!'}/>}
    </div>
    
    )
}

export default SendMail;
