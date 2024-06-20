// import React, { useState,useCallback, useRef, useEffect } from 'react';
// import '../../App.css'
// import toast from 'react-hot-toast';
// import ACTIONS from '../../Actions.js'
// import Client from '../CollabCoding/Client'
// import { Toaster } from 'react-hot-toast';
// import {
//     useLocation,
//     useNavigate,
//     Navigate,
//     useParams,
// } from 'react-router-dom';
// import { FcEndCall } from "react-icons/fc";
// import { io } from 'socket.io-client';
// import { Button } from '../ui/button';
// import { IoVideocam } from "react-icons/io5";
// import ReactPlayer from "react-player";
// import peer from "./peer";

// const VideoCallRoom = () => {
//     const socketRef = useRef(null);
//     const codeRef = useRef(null);
//     const location = useLocation();
//     const { roomId } = useParams();
//     const reactNavigator = useNavigate();
//     const [clients, setClients] = useState([]);
//     const [remoteSocketId, setRemoteSocketId] = useState(null);
//     const [myStream, setMyStream] = useState();
//     const [remoteStream, setRemoteStream] = useState();

//      const initSocket = async () => {
//       const options = {
//           'force new connection': true,
//          reconnectionAttempt: 'Infinity',
//           timeout: 10000,
//           transports: ['websocket'],
//       };
//       // return io(`${import.meta.env.VITE_BACKEND_URL}videocall`, options);
//       return io(`http://localhost:3000/videocall`, options);
//   };
   

//     useEffect(() => {
//         const init = async () => {
//             console.log(roomId)
//             socketRef.current = await initSocket();
//             socketRef.current.on('connect_error', (err) => handleErrors(err));
//             socketRef.current.on('connect_failed', (err) => handleErrors(err));

//             function handleErrors(e) {
//                 console.log('socket error', e);
//                 toast.error('Socket connection failed, try again later.');
//                 reactNavigator('/');
//             }

//             // console.log('socket is',socketRef.current)
//             socketRef.current.emit(ACTIONS.JOIN, {
//                 roomId,
//                 username: location.state?.username,
//             });

//             // Listening for joined event
//             socketRef.current.on(
//                 ACTIONS.JOINED,
//                 ({ clients, username, socketId }) => {
//                     if (username !== location.state?.username) {
//                         toast.success(`${username} joined the room.`);
//                         console.log(`${username} joined`);
//                     }
//                     console.log('client is',clients);
//                     setClients(clients);
//                     socketRef.current.emit(ACTIONS.SYNC_CODE, {
//                         code: codeRef.current,
//                         socketId,
//                     });
//                 }
//             );

//             // Listening for disconnected
//             socketRef.current.on(
//                 ACTIONS.DISCONNECTED,
//                 ({ socketId, username }) => {
//                     toast.success(`${username} left the room.`);
//                     setClients((prev) => {
//                         return prev.filter(
//                             (client) => client.socketId !== socketId
//                         );
//                     });
//                 }
//             );
//         };
//         init();
//         return () => {
//             socketRef.current.disconnect();
//             socketRef.current.off(ACTIONS.JOINED);
//             socketRef.current.off(ACTIONS.DISCONNECTED);
//         };
//     }, []);
    
//     const handleUserJoined = useCallback(({ roomId, username }) => {
//       console.log(`Email ${username} joined room`);
//       setRemoteSocketId(roomId);
//     }, []);
  
//     const handleCallUser = useCallback(async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       const offer = await peer.getOffer();
//       socket.emit("user:call", { to: remoteSocketId, offer });
//       setMyStream(stream);
//     }, [remoteSocketId, socketRef.current]);
  
//     const handleIncommingCall = useCallback(
//       async ({ from, offer }) => {
//         setRemoteSocketId(from);
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });
//         setMyStream(stream);
//         console.log(`Incoming Call`, from, offer);
//         const ans = await peer.getAnswer(offer);
//         socketRef.current.emit("call:accepted", { to: from, ans });
//       },
//       [socketRef.current]
//     );
  
//     const sendStreams = useCallback(() => {
//       for (const track of myStream.getTracks()) {
//         peer.peer.addTrack(track, myStream);
//       }
//     }, [myStream]);
  
//     const handleCallAccepted = useCallback(
//       ({ from, ans }) => {
//         peer.setLocalDescription(ans);
//         console.log("Call Accepted!");
//         sendStreams();
//       },
//       [sendStreams]
//     );
  
//     const handleNegoNeeded = useCallback(async () => {
//       const offer = await peer.getOffer();
//       socketRef.current.emit("peer:nego:needed", { offer, to: remoteSocketId });
//     }, [remoteSocketId, socketRef.current]);
  
//     useEffect(() => {
//       peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//       return () => {
//         peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//       };
//     }, [handleNegoNeeded]);
  
//     const handleNegoNeedIncomming = useCallback(
//       async ({ from, offer }) => {
//         const ans = await peer.getAnswer(offer);
//         socketRef.current.emit("peer:nego:done", { to: from, ans });
//       },
//       [socketRef.current]
//     );
  
//     const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//       await peer.setLocalDescription(ans);
//     }, []);
  
//     useEffect(() => {
//       peer.peer.addEventListener("track", async (ev) => {
//         const remoteStream = ev.streams;
//         console.log("GOT TRACKS!!");
//         setRemoteStream(remoteStream[0]);
//       });
//     }, []);
  
//     useEffect(() => {
//       socketRef.current.on("user:joined", handleUserJoined);
//       socketRef.current.on("incomming:call", handleIncommingCall);
//       socketRef.current.on("call:accepted", handleCallAccepted);
//       socketRef.current.on("peer:nego:needed", handleNegoNeedIncomming);
//       socketRef.current.on("peer:nego:final", handleNegoNeedFinal);
  
//       return () => {
//         socketRef.current.off("user:joined", handleUserJoined);
//         socketRef.current.off("incomming:call", handleIncommingCall);
//         socketRef.current.off("call:accepted", handleCallAccepted);
//         socketRef.current.off("peer:nego:needed", handleNegoNeedIncomming);
//         socketRef.current.off("peer:nego:final", handleNegoNeedFinal);
//       };
//     }, [
//       socketRef.current,
//       handleUserJoined,
//       handleIncommingCall,
//       handleCallAccepted,
//       handleNegoNeedIncomming,
//       handleNegoNeedFinal,
//     ]);

//     async function copyRoomId() {
//         try {
//             await navigator.clipboard.writeText(roomId);
//             toast.success('Room ID has been copied to your clipboard');
//         } catch (err) {
//             toast.error('Could not copy the Room ID');
//             console.error(err);
//         }
//     }

//     function leaveRoom() {
//         reactNavigator('/message');
//     }

//     if (!location.state) {
//         return <Navigate to="/" />;
//     }

//     return (
//         <>
//         <div className="mainWrap w-full">
//             <div className="aside h-full">
//                 <div className="asideInner">
//                     <h3>Connected</h3>
//                     <div className="clientsList">
//                         {clients.map((client) => (
//                             <Client
//                                 key={client.socketId}
//                                 username={client.username}
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <button className="btn copyBtn" onClick={copyRoomId}>
//                     Copy ROOM ID
//                 </button>
//                 <button className="btn leaveBtn font-bold" onClick={leaveRoom}>
//                     <FcEndCall fontSize={'1.5rem'}/>
//                 </button>
//             </div>
//             <div className="editorWrap bg-[#1c1e29] w-full h-full">
//                 <Button className="bg-[#4aed88] text-black hover:bg-green-800] px-[5rem]"><IoVideocam fontSize={'1.6rem'}/></Button>
//             </div>
//             <div>
//                 <Toaster
//                     position="top-right"
//                     toastOptions={{
//                         success: {
//                             theme: {
//                                 primary: '#4aed88',
//                             },
//                         },
//                     }}
//                 ></Toaster>
//             </div>
//         </div>
//         <div className="mobile_collab_coding">
//                 <label htmlFor="" className="text-red-600 font-bold">This functionalities is not working in Mobile devices</label>
//         </div>
//         </>
//     );
// };

// export default VideoCallRoom;
