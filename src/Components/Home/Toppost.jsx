import React from 'react'
import "./Toppost.css"
import { Button } from "@mui/material";

function Toppost() {
  return (
    <div>
        <div className="topcont">
            <img src="https://wallpapers.com/images/featured/professor-money-heist-1yegj3ptnd8g5noc.jpg"/>
            <h1>Hi P., are you hiring?</h1>
            <p>Discover free and easy ways to find a great hire, fast. </p>
            <div className="startpost">
                <img src="User.jpg"/>
                <Button variant="outlined" style={{width:'80%',height:'40px'}}size="large">Start a Post</Button>
            </div>
        </div>
    </div>
  )
}

export default Toppost