import React from 'react'
import { useNavigate } from 'react-router-dom';
import emailVerified from '../../assets/image/emailVerified.png'

const AccountActivation = () => {
  const navigate = useNavigate();
  const onclickHandler = () => {
    navigate('/signin');
  }
   return (
    <div className='flex flex-col h-full justify-center items-center gap-4'>
      <img src={emailVerified} className='size-44' alt="verifyImage" />
      <h5>Your email is successfully verified! Now you can Sign in</h5>
      <button className='bg-mainColor text-white font-bold px-4 py-1.5 rounded-md' onClick={onclickHandler}>Sign in</button>
    </div>
  )
}

export default AccountActivation
