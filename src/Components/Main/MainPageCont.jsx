import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

const MainPageCont = () => {
  return (
    <>
        <Header/>
        <div className="main_container border w-[74%]  justify-self-center" style={{maxWidth:'1000px'}}>
          <Outlet/>
        </div>
    </>
  )
}

export default MainPageCont
