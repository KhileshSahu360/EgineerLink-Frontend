import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import emailVerified from '../../assets/image/emailVerified.png'
import { VscError } from "react-icons/vsc";

const AccountActivation = () => {

  const [invalidLinkError, setInvalidLinkError] = useState(false);
  const [alreadyVerifiedError, setAlreadyVerifiedError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wrong, setWrong] = useState(false);
  const { id, token } = useParams();
const backend_url = import.meta.env.VITE_BACKEND_URL;
  useEffect(()=>{
    if(id && token){
      isTokenAuth();
    }
    setInvalidLinkError(false);
    setAlreadyVerifiedError(false);
    setWrong(false);
    setSuccess(false);
  },[id,token])

  const isTokenAuth = async () => {
    let result =  await fetch(`${backend_url}tokenauth/${id}/${token}`,{
      method : 'post',
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    result = await result.json();
    if(result.error === 'invalid link'){
      setInvalidLinkError(true);
    }if(result.error === 'already verified'){
      setAlreadyVerifiedError(true);
    }if(result.status === true){
      setSuccess(true);
    }else{
      setWrong(true);
    }
  } 

  const navigate = useNavigate();
  const onclickHandler = () => {
    navigate('/signin');
  }
   return (
    <div className='flex flex-col h-full justify-center items-center gap-4'>
      {success ?
      <>
        <img src={emailVerified} className='size-44' alt="verifyImage" />
        <h5>Your email is successfully verified! Now you can Sign in</h5>
        <button className='bg-mainColor text-white font-bold px-4 py-1.5 rounded-md' onClick={onclickHandler}>Sign in</button>
      </>
      :invalidLinkError ?
      <>
        <h1 style={{color:'red'}}><VscError color='red'/> Invalid Link</h1>
        <h1>Link is invalid! Please visit through sent link.</h1>
      </>
      :alreadyVerifiedError ?
      <>
        <img src={emailVerified} className='size-44' alt="verifyImage" />
        <h5>Your Account is already verified! You can sign in.</h5>
        <button className='bg-mainColor text-white font-bold px-4 py-1.5 rounded-md' onClick={onclickHandler}>Sign in</button>
      </>:''
      }
    </div>
  )
}

export default AccountActivation
