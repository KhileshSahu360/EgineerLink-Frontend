import React, { useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Loader from '../Loader/Loader';
import '../SignIn/SignIn.css'

const ResetPassword = () => {
  const newpassRef = useRef('');
  const confirmpassRef = useRef('');
  const [loading,setLoading] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log('submit click')
  }
  return (
    <div className=' h-full flex flex-col gap-5 justify-center items-center sign_up'>
      <div>
        <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt=""/>
      </div>
      <form onSubmit={submitHandler} className='resetpassword_form h-auto gap-1 p-5 px-7 border-2 rounded-md bg-white flex flex-col'>
        <span>New Password</span>
        <input type="password" ref={newpassRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
        <span>Confirm Password</span>
        <input type="password" ref={confirmpassRef} className='rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor'/>
    
        <button type='submit' className='w-full bg-mainColor mt-3 p-2 rounded-lg text-white font-bold'>{loading?<Loader color={'white'}/>:"Reset"}</button>
      </form>
    </div>
    
    )
}

export default ResetPassword
