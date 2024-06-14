import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import './MainPageCont.css';

const MainPageCont = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState();
  const pathname = location.pathname === '/' ? '' : location.pathname.substring(1);


  useEffect(()=>{
    setSelectedTab(pathname)
  },[pathname])
  return (
    <>
        <Header selectedTab={selectedTab}/>
        <div className="main_container w-[74%]  justify-self-center" style={{maxWidth:'1000px'}}>
          <Outlet/>
        </div>
    </>
  )
}

export default MainPageCont
