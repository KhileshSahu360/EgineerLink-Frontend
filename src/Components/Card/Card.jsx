import React, { useState } from 'react';
import './Card.css';
import Button from '@mui/material/Button';
import { TiTick } from "react-icons/ti";
import { IoPersonAddSharp } from "react-icons/io5";

function Card() {
    const [clicked, setClicked] = useState(false);
    const [buttonText, setButtonText] = useState(
        <><IoPersonAddSharp style={{marginRight: '5px',fontSize:'20px'}}/> Follow</>
    );

    const handleClick = () => {
        setClicked(!clicked);
        setButtonText(clicked ? 
            <><IoPersonAddSharp style={{marginRight: '5px',fontSize:'20px'}}/> Follow</> :
            <>Followed <TiTick style={{marginLeft: '5px',fontSize:'25px'}}/></>
        );
    };

    return (
        <div className="slide-container swiper">
            <div className="slide-content">
                <div className="card-wrapper swiper-wrapper">
                    <div className="card swiper-slide">
                        <div className="image-content">
                            <span className="overlay"></span>
                            <div className="card-image">
                                <img src="https://cdn.mos.cms.futurecdn.net/5vPndSdDicde7EwTyAtqjk-768-80.jpg.webp" alt="" className="card-img" />
                            </div>
                        </div>
                        <div className="card-content">
                            <h2 className="name">David Dell</h2>
                            <p className="description">The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.</p>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: clicked ? 'transparent' : '#800082',
                                    color: clicked ? '#800082' : '',
                                    border: '1px solid #800082',
                                    fontWeight: 700,
                                    borderColor: clicked ? '#800082' : '#800082',
                                    margin:'10px'
                                }}
                                onClick={handleClick}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
