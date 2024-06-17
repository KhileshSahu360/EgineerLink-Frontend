import React, { useEffect, useRef, useState } from "react";
import EngineerLinkLogo from "../../assets/logo/EngineerLinkLogo.svg";
import Loader from "../Loader/Loader";
import "../SignIn/SignIn.css";
import Alerts from "../Alert/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [emptyAlert, setEmptyAlert] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [validLink, setValidLink] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [notMatchAlert, setNotMatchAlert] = useState(false);
  const [passLengthAlert, setPassLengthAlert] = useState(false);
  const newpassRef = useRef("");
  const confirmpassRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [isPassShowed, setIsPassShowed] = useState(false);
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    isLinkValid();
  },[]);
  const isLinkValid = async () => {
    try {
      let response = await fetch(
        `${backend_url}tokenauth/islinkvalid/${id}/${token}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response.status === true) {
        setValidLink(true);
      } else {
        setInvalidLink(true);
      }
    } catch (error) {}
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const password = newpassRef.current.value;
    const confirmPassword = confirmpassRef.current.value;
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password.length >= 8) {
        if (password === confirmPassword) {
          setLoading(true);
          try {
            let response = await fetch(
              `${backend_url}tokenauth/resetpassword`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ password,id }),
              }
            );
            response = await response.json();
            setLoading(false);
            if (response.status === true) {
              navigate("/");
            } else if (response.status === false) {
              setWrong(true);
              setLoading(false);
            }
          } catch (err) {
            setWrong(true);
            setLoading(false)
          }
        } else {
          setNotMatchAlert(true);
        }
      } else {
        setPassLengthAlert(true);
      }
    } else {
      setEmptyAlert(true);
    }
  };
  const eyesClick = () => {
    if (confirmpassRef.current.type === "password") {
      confirmpassRef.current.type = "text";
      setIsPassShowed(true);
      confirmpassRef.current.focus();
    } else {
      confirmpassRef.current.type = "password";
      confirmpassRef.current.focus();
      setIsPassShowed(false);
    }
  };
  return (
    <div className=" h-screen flex flex-col gap-5 justify-center items-center sign_up">
      {validLink && (
        <>
          <div>
            <img className="cursor-pointer h-9" src={EngineerLinkLogo} alt="" />
          </div>
          <div className="w-[27%]">
            {emptyAlert && (
              <Alerts
                types={"error"}
                msg={"Please fill all the Field!"}
                status={setEmptyAlert}
              />
            )}
            {wrong && (
              <Alerts
                types={"error"}
                msg={"Please try after some times!"}
                status={setWrong}
              />
            )}
            {passLengthAlert && (
              <Alerts
                types={"error"}
                msg={"Password must be greater than 8 characters!"}
                status={setPassLengthAlert}
              />
            )}
            {notMatchAlert && (
              <Alerts
                types={"error"}
                msg={"Passwod did not match! Please check it!"}
                status={setNotMatchAlert}
              />
            )}
          </div>
          <form
            onSubmit={submitHandler}
            className="resetpassword_form h-auto gap-1 p-5 px-7 border-2 rounded-md bg-white flex flex-col"
          >
            <span>New Password</span>
            <input
              type="password"
              ref={newpassRef}
              className="rounded-lg p-1 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor"
            />
            <span>Confirm Password</span>
            <div className="password relative">
              <input
                type="password"
                ref={confirmpassRef}
                className="rounded-lg p-1 w-full pr-8 px-2 text-[0.95rem] py-1 outline-none border-2 border-gray-300 focus:border-mainColor"
              />
              {isPassShowed ? (
                <IoEyeSharp
                  onClick={eyesClick}
                  className="open_eye absolute top-2.5 right-3 cursor-pointer text-gray-800"
                />
              ) : (
                <HiMiniEyeSlash
                  onClick={eyesClick}
                  className="close_eye absolute top-2.5 right-3 cursor-pointer text-gray-800"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-mainColor mt-3 p-2 rounded-lg text-white font-bold"
            >
              {loading ? <Loader color={"white"} /> : "Reset"}
            </button>
          </form>
        </>
      )}
      {invalidLink && (
        <>
          <h1 style={{ color: "red" }}>
            <VscError color="red" /> Invalid Link
          </h1>
          <h1>Link is invalid! Please visit through sent link.</h1>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
