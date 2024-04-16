import React, { useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Loader from '../Loader/Loader';
import '../SignIn/SignIn.css'

const SendMail = () => {
  const emailRef = useRef('');
  const [loading,setLoading] = useState(false);
  const [emptyError,setEmptyError] = useState(false);
  const falseToastify = () => {
    setEmptyError(false);
  }
  const submitHandler = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    if(email.length > 0){
      
    }else{
      alert('length down');
    }
    console.log('submit click')
  }
  return (
    <div className=' h-full flex flex-col gap-5 justify-center items-center sign_up'>
      <div>
        <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt=""/>
      </div>
      {emptyError &&  <ErrorToastify time={3000} deActivate={falseToastify} msg={'Something wrong! Try Again'}/>}
      <form onSubmit={submitHandler} className='verifyemail_form h-auto gap-1 p-5 px-7 border-2 rounded-md bg-white flex flex-col'>
        <span>Email</span>
        <input type="email" ref={emailRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    
        <button type='submit' className='w-full bg-mainColor mt-3 p-2 rounded-lg text-white font-bold'>{loading?<Loader color={'white'}/>:"Send mail"}</button>
      </form>
    </div>
    
    )
}

export default SendMail;
