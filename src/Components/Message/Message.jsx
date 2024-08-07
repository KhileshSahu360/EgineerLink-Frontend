import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UnknownAvatar from "../../../public/Unknown.jpg";
import Welcome from "../../../public/welcomesvg.svg";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import "./Message.css";
import ShowMessage from "./ShowMessage";
import MessageCont from "./MessageCont";
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { userDetailAction, socketAction, dataFetchedStatusAction, messageAction } from '../Store/Store.jsx'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import { CircleLoader } from "../Loader/Loader.jsx";

const Message = () => {
  const dispatch = useDispatch();
  document.title = "Chat-App"
  const [message, setMessage] = useState([]);
  const [localUserData, setLocalUserData] = useState();
  const { user, selectedUser } = useSelector(store => store.userDetailSlice)
  const { messageDataStatus } = useSelector(store => store.dataFetchedStatusSlice)
  const { filterChatList, lastMessage } = useSelector(store => store.messageSlice)
  const { userData } = useSelector(store => store.postSlice)
  const [userChatList, setUserChatList] = useState(null); 
  const [inputSearchText, setInputSearchText] = useState('');
  const [nouserFoundMsg, setNouserFoundMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND_URL_SOCKET;
  let socketConnection;
  useEffect(()=>{
    if(!messageDataStatus && localUserData)  {
      getChatList();
    }
  },[localUserData])

  const getChatList = () => {
    setLoading(true);
     socketConnection = io(`${backend_url}`,{
      auth:{
        localUserId : localUserData?._id
      }
    })

    const newUserChatList = user.followers.filter((elm)=>{
      const rs = user.following.some(obj => obj._id === elm._id)
      return rs;
    })
    setUserChatList(newUserChatList);
    dispatch(messageAction.setFilterChatList(newUserChatList));


    var filteredLastMsg = [];
    newUserChatList.map((elm)=>{
      console.log('local',localUserData?._id)
      console.log('niche',elm?._id);
      socketConnection.emit('get_message', { selectedUser: elm?._id, localUser: localUserData?._id });
      
      const handleMessage = (data) => {
        const messages = data.messages.messageId;
        const unseenCount = messages.filter(message => !message.seen && localUserData?._id !== message.senderId._id).length;
        const lastMsg = messages[messages.length - 1];
        let user;
        if(localUserData?._id){
          if(lastMsg.senderId._id==localUserData._id){
            user = lastMsg.receiverId._id;
          }else{
            user = lastMsg.senderId._id;
          }
        }
        const newMsg = {...lastMsg, user};
        filteredLastMsg = [...filteredLastMsg, newMsg]
        console.log(filteredLastMsg)
        dispatch(messageAction.setLastMessage(filteredLastMsg));
      };
      socketConnection.on('messages_are', handleMessage);
    })
    
    dispatch(socketAction.setSocket(socketConnection));
    
    socketConnection.on('online_users',(data)=>{
      dispatch(userDetailAction.setOnlineUsers(data));
      })
      
      console.log(messageDataStatus)
      dispatch(dataFetchedStatusAction.setMessageDataStatus(messageDataStatus));

      setLoading(false);
  }
  
  useEffect(()=>{
    setLocalUserData(user)
    return ()=>{
      dispatch(userDetailAction.setSelectedUser({}));
      // socketConnection.off('messages_are', handleMessage);
      // socketConnection.disconnect();
    }
  },[user])

  const searchUser = (event) => {
    const searchTerm = event.target.value;
    setInputSearchText(searchTerm);

    const filtered = searchTerm  
    ?  userChatList.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    ) : userChatList 
    dispatch(messageAction.setFilterChatList(filtered));
    if(filtered.length <= 0) setNouserFoundMsg(true);
  }
  return (
    <div className="grid grid-cols-10 rounded-lg relative">
      <div className="chatlist_container bg-white overflow-y-auto border  col-span-3 h-messageHeight rounded-tl-md">
        <div className="mt-1">
          <label className="font-bold text-[1.4rem] ml-4 mb-2">Chats</label>
        </div>
        <div className="relative mx-[4%]">
          <input
            type="text"
            className="mt-1 w-full border-chatSecondarayColor border-2 outline-none focus:border-green-400 focus:border-2 bg-chatSecondarayColor px-10 py-1 rounded-lg"
            placeholder="Search"
            value={inputSearchText}
            onChange={searchUser}
          />
          <label
            htmlFor=""
            className="search_icon_of_chat absolute top-[.85rem] left-5"
          >
            <IoIosSearch />
          </label>
        </div>
        <div className="mt-3 ml-4 mb-2">
          <label
            htmlFor=""
            className="px-3 py-1 bg-green-200 text-blue-800 rounded-2xl"
          >
            All
          </label>
        </div>

        <div >
            {
              !loading ? lastMessage?.length > filterChatList?.length * 2 && filterChatList?.length > 0 ? filterChatList.map((elm,index)=>{
                return  <ChatList key={elm?._id} localUserId={localUserData?._id} lastMessage={lastMessage}  AllDetails={elm} selectedUser={selectedUser}/>
                
              })
              : !nouserFoundMsg ? <div className="flex flex-col items-center">
                  <h1 className="tracking-wide font-medium text-[1.5rem]">Hii, {user.name}</h1>
                  <label htmlFor="" className="-mt-1">Please make friend</label>
              </div>
              : <div className="flex flex-col items-center">
                  <label htmlFor="" className="-mt-1">No user Found!</label>
              </div> 
              : <div className="flex justify-center items-center p-8">
                <CircleLoader color={'#b200b5'} size={20}/>
              </div>
              }
        </div>
      </div>
      {/* message container */}
      {selectedUser?._id ? <MessageCont selectedUser={selectedUser} localUser={user}/>:
      <div className="message_container welcome_container flex flex-col bg-white col-span-7 h-messageHeight rounded-tr-md overflow-hidden">
        <WelcomeCont/>
      </div> 
      }
    </div>
  );
};

const ChatList = ({AllDetails, selectedUser, localUserId, lastMessage}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(AllDetails.name);
  const [unseen, setUnseen] = useState(0)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const { socket } = useSelector(store => store.socketSlice);
  useEffect(() => {
    setLoading(true);
    const removeDuplicates = (array) => {
      const uniqueObjects = array.reduce((acc, current) => {
          acc.set(current.user, current);
          return acc;
      }, new Map());
  
      return Array.from(uniqueObjects.values());
  };
  
  const uniqueArray = removeDuplicates(lastMessage);
  
  const setMsg = (uniqueArray) => {
    const newArr = uniqueArray.filter((elm)=> elm.user === AllDetails._id);
    return newArr[0];
  }
  setMessage(setMsg(uniqueArray));

    // Cleanup to avoid multiple listeners
    setLoading(false);
    return () => {
      
    };
  }, [socket, AllDetails._id, localUserId, lastMessage]);

  const selectUser = (data) => {
    dispatch(userDetailAction.setSelectedUser(data))
  }
  return (
    <div className={`pt-2 cursor-pointer relative ${selectedUser?._id === AllDetails._id ? 'bg-chatSecondarayColor' : null} hover:bg-chatSecondarayColor`} onClick={()=>selectUser(AllDetails)}>
      <div className="pl-4 flex gap-4 place-items-center">
        <Avatar className="scale-110">
          <AvatarImage src={AllDetails.avatar} alt="@shadcn" />
          <AvatarFallback>{AllDetails.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[1.1rem] tracking-wide">
            {
                name.length > 14
                    ? name.substring(0, 14) + ".."
                    : name
                }
          </label>
          {message?.message !== undefined ?<label
            htmlFor=""
            className="text-[.8rem] tracking-wide flex items-center gap-1"
          >
            {
              localUserId === message?.senderId?._id &&   <label htmlFor="">
              <RiCheckDoubleLine style={message.seen ? {color:'#0195f7'} : null} fontSize={"1rem"} className="opacity-50" />
            </label>
            }
            {message?.message?.length <= 14 ? message.message : `${message?.message?.substring(0, 14)} ...`}
          </label>  
          : <lable className="mt-1">
              <CircleLoader color={'green'} size={12}/>
          </lable>
          }
        </div>
        {unseen > 0 && <div className="ml-auto mr-10">
            <ColorBadge totalUnseen={unseen}/>
      </div>}
      </div>
      <div className="w-full pr-3 flex mt-2 justify-end">
        <div className="border-b w-[76%]"></div>
      </div>
      
    </div>
  );
};

const WelcomeCont = () => {
  return (
    <>
      <div>
        <img src={Welcome} alt="" className="scale-50" />
        <div className="text-center">
          <label htmlFor="" className="text-[1.5rem] font-light">
            Welcome to our Chat App's
          </label>
        </div>
        <div className="mt-10 text-center">
          <label
            htmlFor=""
            className="flex justify-center items-center gap-1 px-2 py-1 bg-bgColor"
          >
            <FaLock className="opacity-70" />
            You personal message are end-to-end encrypted
          </label>
        </div>
      </div>
    </>
  );
};

 function ColorBadge({totalUnseen}) {
  return (
    <Stack spacing={2} direction="row">
      <Badge badgeContent={totalUnseen} color="success">
      </Badge>
    </Stack>
  );
}
export {WelcomeCont};
export default Message;
