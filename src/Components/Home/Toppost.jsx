import React from 'react'
import "./Toppost.css"
import { Button, ButtonBase } from "@mui/material";
import { Link } from 'react-router-dom';
import CreatePost from '../Post/CreatePost';

function Toppost({name, getUserData, localUserId, profileImage}) {
  return (
    <div>
        <div className="topcont">
           <Link to={`/seeuserprofile/${localUserId}`}>
            <img src={profileImage}/>
          </Link>
            <h1>Hi {name}, Welcome to Engineer Link ?</h1>
            <p>Discover free and easy ways to find a great hire, fast. </p>
            <div className="startpost gap-2">
                <img src={profileImage}/>
                <Button variant="outlined" style={{width:'80%',height:'40px'}}size="large"><CreatePost title={'Start a post'} getUserData={getUserData} name={name} localUserId={localUserId} profileImage={profileImage}/></Button>
            </div>
        </div>
    </div>
  )
}

export default Toppost