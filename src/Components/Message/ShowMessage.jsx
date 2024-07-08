import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { RiCheckDoubleLine } from "react-icons/ri";
import { CircleLoader } from '../Loader/Loader.jsx'


const ShowMessage = ({selectedUser, localUser}) => {

  const { socket } = useSelector(store => store.socketSlice);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const latestMessageRef = useRef();
  useEffect(()=>{
   setLoading(true);
    if(socket){
      socket.emit('get_message',{selectedUser, localUser})
      socket.on('messages_are',(messages)=>{
        const m = messages.messages.messageId;
        setMessage(m); 
      })
    }
    setLoading(false);
    },[selectedUser])
    
    useEffect(() => {
      // Scroll to the latest message
      setLoading(true);
      if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if(socket){
      socket.emit('seen',{selectedUser, localUser})
      }
    setLoading(false);
  }, [message]);
  return (
    <div className="overflow-auto h-full img_div bg-instaWhiteColor pt-2 px-5 flex-1">
      {
        !loading ? message && message.map((elm, index)=>{
          return <div key={elm._id}  ref={index === message.length - 1 ? latestMessageRef : null} className={`chat ${localUser === elm.senderId._id ? 'chat-end' : 'chat-start'} `}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={ elm.senderId.avatar}
              />
            </div>
          </div>
          <div className={`chat-bubble ${localUser === elm.senderId._id ? 'bg-green-300 text-black' : 'bg-mainColor text-white'}  w-[60%]  relative`}>
            {elm.message}
            <label htmlFor="" className={`absolute bottom-0 flex items-center gap-1 right-2 text-[.7rem] ${localUser === elm.senderId._id ? ' text-black opacity-50' : 'text-white opacity-80'} `}>{moment(elm.createdAt).format('MMMM Do, h:mm a')}{localUser === elm.senderId._id && <RiCheckDoubleLine fontSize={'.9rem'} style={elm.seen ?{color : '#0195f7' } : null}/>}</label>
          </div>
        </div>
        })
      : 
      <div className="flex place-items-center justify-center h-full">
        <label htmlFor=""><CircleLoader color={'green'} size={40}/></label>
      </div>
        
        }
    </div>
  );
};

export default ShowMessage;
