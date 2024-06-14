import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ShowMessage from "./ShowMessage";
import { IoSendSharp } from "react-icons/io5";
import { WelcomeCont } from "./Message";
import UnknownAvatar from "../../../public/Unknown.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { userDetailAction } from '../Store/Store.jsx'
import axios from 'axios';


const MessageCont = ({selectedUser, localUser}) => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState('');
  const { onlineUsers } = useSelector(store => store.userDetailSlice)
  const { socket } = useSelector(store => store.socketSlice);

  const [isUserOnline, setIsUserOnline] = useState(false);

  const clearSelectedUser = () => {
    dispatch(userDetailAction.setSelectedUser(null));
  }

  useEffect(()=> {
    const result = onlineUsers?.includes(selectedUser?._id);
    setIsUserOnline(result);
  },[onlineUsers])
  const sendMessage = () => {
    if(socket){
      if(inputMessage.length > 0){
        socket.emit('new_message',{receiverId:selectedUser._id, senderId:localUser._id, message:inputMessage})
      }
    }
    setInputMessage('');
  }
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  return (
    <>
      {selectedUser._id ? <div className="message_container flex flex-col bg-white col-span-7 h-messageHeight rounded-tr-md overflow-hidden ">
        {/* header */}
        <header className="h-[3.5rem] flex gap-3 items-center pl-4 w-full sticky top-0 bg-instaWhiteColor border">
          <label htmlFor="" onClick={clearSelectedUser} className="left_arrow hidden"><FaArrowLeft className="cursor-pointer"/></label>
          <Avatar className="border">
            <AvatarImage src={selectedUser.avatar} alt="@shadcn" />
            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <label htmlFor="" className="tracking-wide">
              {selectedUser.name}
            </label>
            {
              isUserOnline ?
              <label className="text-sm text-green-600 tracking-wide font-medium -mt-1">online</label>
              :
              <label className="text-sm  -mt-1 tracking-wide">offline</label>
            }
          </div>
        </header>

        {/* show all message */}
        <main className="flex-1 overflow-auto">
          <ShowMessage selectedUser={selectedUser._id} localUser={localUser._id}/>
        </main>

        {/* footer */}
        <div className="h-[4rem] grid grid-cols-10 gap-2 px-4 place-items-center w-full sticky bottom-0 bg-instaWhiteColor border">
          <div className="col-span-9 w-full">
            <input
              type="text"
              className="w-full px-3 py-2 outline-none rounded-lg"
              placeholder="Type a message"
              value={inputMessage}
              onKeyDown={handleEnterKeyPress}
              onChange={(e)=>setInputMessage(e.target.value)}
            />
          </div>
          <div className="col-span-1 ">
            <button
              htmlFor=""
              className="bg-mainColor rounded-full flex place-items-center px-2 py-2 cursor-pointer"
              onClick={sendMessage}
            >
              <IoSendSharp fontSize={"1.6rem"} color="white" />
            </button>
          </div>
        </div>
      </div> : 
   '' 
    }
    </>
  );
};

export default MessageCont;
