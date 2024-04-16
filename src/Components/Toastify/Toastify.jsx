import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react'

const Toastify = ({msg,time,deActivate}) => {
  const notify = (msg) => toast.success(msg);
  useEffect(()=>{
    notify(msg);
  },[])
  const handleClose = () => {
    deActivate();
  }
  return (
    <ToastContainer
    position="top-right"
    autoClose={time}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    onClose={handleClose}
    theme="colored"
    />
  )
}
const ErrorToastify = ({msg,time,deActivate}) => {
  const notify = (msg) => toast.error(msg);
  useEffect(()=>{
    notify(msg);
  })
  const handleClose = () => {
    deActivate();
  }
  return(
    <ToastContainer
    position="top-right"
    autoClose={time}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
      pauseOnFocusLoss
      draggable
      onClose={handleClose}
      pauseOnHover
      theme="colored"
      />
  )
}
export { ErrorToastify };
export default Toastify
