import React, { useEffect, useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Avatar from "../../assets/image/Avatar.png";
import { GoPencil } from "react-icons/go";
import { LuSchool } from "react-icons/lu";
import { GiRailway, GiSkills } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import './Profile.css';
import { Button } from '../ui/button';
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Alerts from '../Alert/Alert';
import { MdDelete } from "react-icons/md";
import { Form, Link } from 'react-router-dom';
import Toastify, { ErrorToastify } from '../Toastify/Toastify';
import CreatePost  from '../Post/CreatePost';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userDetailAction } from '../Store/Store';
import axios from 'axios';
import { useParams } from "react-router-dom";



const SeeUserProfile = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userIdToSee } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('Unknown.jpg');
  const [showSeeMoreButton,setShowSeeMoreButton] = useState(false);
  const aboutContentRef = useRef(null);
  const [uploadingFailed,setUploadingFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [post, setPost] = useState([]);
  const [fullUserData, setFullUserData] = useState(null);
  const [localUserData, setLocalUserData] = useState(null);
  const localUserId = localStorage.getItem('v09userInfoId');
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(()=>{
    if(localUserId === userIdToSee){
      navigate('/profile');
    }
    if(localUserId){
      getLocalUserData();
    }
    if(userIdToSee){
      getUserData();
    }
    if(aboutContentRef.current){
      setShowSeeMoreButton(aboutContentRef.current.scrollHeight !== aboutContentRef.current.clientHeight)
    }
  },[])

  const getLocalUserData = async() => {
    try{
      const rawResponse = await fetch(`${backend_url}user/getuserdata/${localUserId}`,{
        method : 'get',
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const response = await rawResponse.json();
      const { user } = response;
      if(user){

        const res = user.following.some(obj => obj._id === userIdToSee)
        setIsFollowed(res);
        setLocalUserData(user);
      }else{
        navigate('/signin');
      }
    }catch(error){
      navigate('/404error');
    }
    }

  const falseToastify = () => {
    setUploadedSuccessful(false);
    setUploadingFailed(false);
  }
  const getUserData = async() => {
  try{
    const rawResponse = await fetch(`${backend_url}user/getuserprofiledata/${userIdToSee}/${localUserId}`);
    const response = await rawResponse.json();
    const { user } = response;
    if(user){
      document.title = user.name;
      const { post:dbPost, followers:dbFollowers, following:dbFollowing } = user;
      setProfileImage(user.avatar);
      setFullUserData(user);
      setPost(dbPost);
      setFollowers(dbFollowers);
      setFollowing(dbFollowing);
    }else{
      navigate('/signin');
    }
  }catch(error){
    navigate('/404error');
  }
  }
  
  const handleFollow = async(localUserId, userIdToSee) => {
    try{
      if(isFollowed){
        const response = await axios.put(`${backend_url}user/unfollowuser/${localUserId}/${userIdToSee}`);
        getLocalUserData();
      }else{
        const response = await axios.put(`${backend_url}user/followuser/${localUserId}/${userIdToSee}`);
        getLocalUserData();
      }
    }catch(error){
      navigate('/servererror')
    }
  }

  const seeMoreStyle = { 
    WebkitLineClamp:4,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    display:'-webkit-box'
  }
  
  const postSeeMoreStyle = { 
    WebkitLineClamp:3,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    maxWidth:'88%',
    display:'-webkit-box'
  }
  return (
    fullUserData && <>
      <div className='h-full'>
      <div className='h-[auto] pb-3 bg-white rounded-lg'>
        <div className='h-36 relative rounded-sm bg-[#e6e6e6] flex place-items-center justify-center'>
          <img src={EngineerLinkLogo} className='h-9' alt="" />
          <form>
            <div className='p-1 profile_div bg-white absolute max-h-34 max-w-36 min-w-34 min-w-36  top-[30%] left-6 rounded-full overflow-hidden'>
                <img src={profileImage} className='Avatar cursor-pointer' alt="" />
                <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
              />
            </div>
          </form>
        </div>
        <div className='mt-14 pl-7 '>
          <div className='relative'><label htmlFor="" className='font-medium text-2xl'>{fullUserData.name}</label></div>
          <div className='max-w-[70%] subHeading'><label htmlFor="" className='opacity-70'>{fullUserData.heading}</label></div>
          <div><label htmlFor="" className='text-sm opacity-50'>{fullUserData.location}</label></div>
          <div><Link to="/mynetwork" className='text-sm text-[#2174c8] cursor-pointer'>{fullUserData.name}'s Netowrk</Link></div>
          <div>
          {<button variant="text" style={isFollowed?{background:'#efefef',color:'black',height: '30px',fontWeight:'500',fontSize:'15px'}:{background:'#0195f7',color:'white',height: '30px',fontWeight:'500',fontSize:'15px'}} className="flex items-center rounded-md px-8 py-1 mt-2"  onClick={()=>handleFollow(localUserId, userIdToSee)}>
              <h1 className="ml-1">{isFollowed ? 'Unfollow':'Follow'}</h1>
          </button>}
          </div>
        </div>
      </div>

      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
        <div className='flex justify-between px-6 py-2'>
          <label htmlFor="" className='font-medium text-xl'>Activity</label>
        </div>
        <div className='pl-6'>
          <label htmlFor="" className='px-3 py-1 rounded-lg bg-green-700 text-white font-semibold'>Post</label>
        </div>

        {/* post design */}
        {
          post && post.length > 0 ? 
          post.map((elm)=>{
            return <div className='relative'>
              <Link key={elm.postId._id} to={`/seepost/${elm.postId._id}/${localUserId}`} className='pl-7 pt-10 items-center flex gap-3 relative'>
               <label htmlFor="" className='absolute top-[14%] text-[.8rem] opacity-50'>{fullUserData.name} posted this</label>
               <div className='post_img_div overflow-hidden min-h-[4rem] min-w-[4rem] max-h-[5rem] max-w-[5rem]'>
                 <img src={elm.postId.postimage} alt="" className='rounded-lg min-h-[4rem] min-w-[4rem] max-h-[5rem] max-w-[5rem]'/>
               </div>
               <div className='relative max-w-[88%] min-w-[88%] min-h-[4rem] max-h-[5rem] overflow-hidden'>
                 <label htmlFor="" className='text-justify opacity-60 ' style={postSeeMoreStyle}>
                   {elm.postId.posttitle}
                 </label>
               </div>
             </Link>
              <div className='w-[96%] pl-6 mt-2'>
                 <hr />
              </div>
         </div>
          })
          : 
        <div className='flex justify-center '>
          <label htmlFor="" className=' px-2 py-[1px]  rounded-sm'>No post!</label>
        </div>
        }
        {/* end */}
      </div>

      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>About</label>
          </div>
          <div className='relative pl-6  w-[70%]'>
            <label ref={aboutContentRef} htmlFor="" style={isOpen?null:seeMoreStyle}>{fullUserData.about}</label>
            {showSeeMoreButton && <button className='absolute bottom-0 right-[-10%] opacity-70' onClick={()=>setIsOpen(!isOpen)}>{isOpen?'see less':'see more'}</button>}
          </div>
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Educations</label>
          </div>
          {
            fullUserData.education.length > 0 ? fullUserData.education.map((elm, index)=>{
              return <ProfileSection key={index} localUserId={localUserId} getUserData={getUserData} title={'education'} uniqueId={elm._id} icon={<LuSchool fontSize={'2.4rem'}/>} subTitle={elm.school} description={elm.field}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Education!</label>
            </div>
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Experience</label>
          </div>
          {
            fullUserData.experience.length > 0 ? fullUserData.experience.map((elm, index)=>{
              return <ProfileSection key={index} localUserId={localUserId} getUserData={getUserData} title={'experience'} uniqueId={elm._id} icon={<GiSkills fontSize={'2.4rem'}/>} subTitle={elm.company} description={elm.description}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Experience!</label>
            </div>
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Skills</label>
          </div>
          {
            fullUserData.skill.length > 0 ? fullUserData.skill.map((elm, index)=>{
              return <ProfileSection key={index} localUserId={localUserId} getUserData={getUserData} title={'Skill'} uniqueId={elm._id} subTitle={elm.skillname} description={elm.description}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Skill!</label>
            </div>
          }
      </div>

      
      
    </div>
    </>
  )
}

const ProfileSection = (props) => {
  return(
    <>
 
          <div className='pl-6 mb-3  w-[100%] flex items-center'>
            <label htmlFor="">{props.icon}</label>
            <div className='ml-2 w-full'>
              <div className='relative '>
                <label htmlFor="" className='font-normal'>{props.subTitle}</label>
              </div>
              <p htmlFor="" className='opacity-50 mt-[-.1rem]'>{props.description}</p>
            </div>
          </div>
          <div className='px-7 mb-2'>
            <hr />
          </div>
    </>
  )
}
export default SeeUserProfile;