import React from 'react'
import ServerBusy from '../../../public/ServerBusy.png'

const ServerError = () => {
  return(
    <div className='flex justify-center'>
        <img src={ServerBusy} alt="" />
    </div>
  )
}
export default ServerError;