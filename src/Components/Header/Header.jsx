import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import LinkLogo from "../../assets/logo/LinkLogo.svg";
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaPeopleRoof } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import UnknownAvatar from '../../../public/Unknown.jpg'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = ({selectedTab}) => {
  const navigate = useNavigate();
  const [isShowInput, setIsShowInput] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const inputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  var localUserId;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
     localUserId = localStorage.getItem('v09userInfoId');
    if(localUserId){
      getLocalUserData();
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getLocalUserData = async() => {
    try{
      const rawResponse = await fetch(`${backend_url}user/getuserdata/${localUserId}`);
      const response = await rawResponse.json();
      const { user } = response;
      if(user){
        setUserData(user);
      }else{
        navigate('/signin');
      }
    }catch(error){
      navigate('/404error');
    }
    }
  
  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      setShouldFocus(false); // Reset shouldFocus to prevent infinite focus loop
    }
  }, [shouldFocus]);

  const searchHandle = () => {
    if (windowWidth <= 900 && !isShowInput) {
      setIsShowInput(true);
      setShouldFocus(true);
      setBackdrop(true);
    }
  };
  const handleBlur = () => {
    setIsShowInput(false);
    setBackdrop(false);
  };
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="h-12 bg-white shadow-sm px-50 grid justify-items-stretch w-full relative">
      <nav className="w-[80%] h-full justify-self-center  flex ">
        <div
          className={
            windowWidth && isShowInput
              ? "flex-1 w-full  flex items-center left_nav justify-center "
              : "flex-none w-[40%]  flex items-center left_nav"
          }
        >
          <img src={LinkLogo} className="logo" alt="" />
          <div
            className={
              windowWidth && isShowInput
                ? "relative w-full "
                : "relative icon_div "
            }
          >
            <input
              type="text"
              placeholder="Search"
              onBlur={() => setBackdrop(false)}
              onClick={() => setBackdrop(true)}
              className="input_field w-full bg-searchBg ml-2 p-1 border-2 border-searchBg outline-none px-8 focus:border-mainColor rounded-md"
            />
            {windowWidth <= 900 && isShowInput && (
              <input
                type="text"
                ref={inputRef}
                onBlur={handleBlur}
                placeholder="Search"
                className="input_field2 w-full bg-searchBg ml-2 p-1 border-2 border-searchBg outline-none px-8 focus:border-mainColor rounded-md"
              />
            )}
            <label htmlFor="">
              <FaSearch
                className={
                  windowWidth <= 900 && isShowInput
                    ? "absolute top-3  left-5 text-sm text-gray-500"
                    : "absolute top-3 left-5 text-sm text-gray-500 search_icon"
                }
                onClick={searchHandle}
              />
            </label>
          </div>
        </div>
        {((windowWidth <= 900 && !isShowInput) || windowWidth >= 900) && (
          <div className="flex-1  flex items-center h-full right_nav">
            <Link
              to="/"
              className="menu_item h-full"
            >
              <AiFillHome
                className="menu_icon"
                style={{
                  color: selectedTab === "" ? "black" : "rgb(97, 95, 95)",
                }}
              />
              <span
                style={{
                  borderBottom:
                    selectedTab === "" ? "2px solid black" : "none",
                }}
              >
                {" "}
                Home
              </span>
            </Link>
            <Link
              to="/mynetwork"
              className="menu_item"
            >
              <FaPeopleRoof
                className="menu_icon"
                style={{
                  color:
                    selectedTab === "mynetwork" ? "black" : "rgb(97, 95, 95)",
                }}
              />
              <span
                style={{
                  borderBottom:
                    selectedTab === "mynetwork" ? "2px solid black" : "none",
                }}
              >
                My Network
              </span>
            </Link>
            <Link
              to="/notifications"
              className="menu_item"
            >
              <IoNotifications
                className="menu_icon"
                style={{
                  color:
                    selectedTab === "notifications"
                      ? "black"
                      : "rgb(97, 95, 95)",
                }}
              />
              <span
                style={{
                  borderBottom:
                    selectedTab === "notifications"
                      ? "2px solid black"
                      : "none",
                }}
              >
                Notifications
              </span>
            </Link>
            <Link
              to="/collabcoding"
              className="menu_item removed_menu"
            >
              <FaCode
                className="menu_icon"
                style={{
                  color:
                    selectedTab === "collabcoding"
                      ? "black"
                      : "rgb(97, 95, 95)",
                }}
              />
              <span
                style={{
                  borderBottom:
                    selectedTab === "collabcoding"
                      ? "2px solid black"
                      : "none",
                }}
              >
                Collab Coding
              </span>
            </Link>
            <Link
              to="message"
              className="menu_item removed_menu"
            >
              <AiFillMessage
                className="menu_icon"
                style={{
                  color:
                    selectedTab === "message" ? "black" : "rgb(97, 95, 95)",
                }}
              />
              <span
                style={{
                  borderBottom:
                    selectedTab === "message" ? "2px solid black" : "none",
                }}
              >
                Message
              </span>
            </Link>
            <Link
              to="profile"
              className="menu_item removed_menu"
            >
              {userData ? 
                    <img src={userData.avatar} alt="" className="size-5 rounded-full" />
                    :
                    <img src={UnknownAvatar} alt="" className="size-5 rounded-full"/>
                      }
              <span
                style={{
                  borderBottom:
                    selectedTab === "profile" ? "2px solid black" : "none",
                }}
              >
                Me
              </span>
            </Link>
            <div className="three_dot">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={openMenu}
              >
                <BsThreeDotsVertical
                  color="rgb(97, 95, 95)"
                  fontSize={"1.2rem"}
                />
              </Button>
              <MobileNav Avatar={userData?.avatar} openMenu={openMenu} handleClose={handleClose} open={open} anchorEl={anchorEl}/>
            </div>
          </div>
        )}
      </nav>
      {backdrop && (
        <div className="backdrop z-50 absolute h-[92vh] bg-[#00000059] w-full top-12"></div>
      )}
    </div>
  );
};

const MobileNav = (props) => {

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={props.handleClose}>
          <Link to='/collabcoding' className="mo_menu_link"><FaCode/>Collab Coding</Link>
        </MenuItem>
        <MenuItem onClick={props.handleClose}>
          <Link to='/message' className="mo_menu_link"><AiFillMessage/> Message</Link>
        </MenuItem>
        <MenuItem onClick={props.handleClose}>
          <Link to='/profile' className="mo_menu_link"><img src={props.Avatar} alt="" className="size-5 rounded-full"/>Me</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Header;
