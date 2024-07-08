import React, { useEffect, useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Avatar from "../../assets/image/Avatar.png";
import { GoPencil } from "react-icons/go";
import { LuSchool } from "react-icons/lu";
import { GiRailway, GiSkills } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import './Profile.css';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
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


const Profile = () => {
  document.title = "My-Profile"
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('Unknown.jpg');
  const [showSeeMoreButton,setShowSeeMoreButton] = useState(false);
  const aboutContentRef = useRef(null);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [heading, setHeading] = useState('');
  const [education, setEducation] = useState([]); 
  const [experience, setExperience] = useState([]); 
  const [skill, setSkill] = useState([]); 
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [uploadedSuccessful,setUploadedSuccessful] = useState(false);
  const [uploadingFailed,setUploadingFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [post, setPost] = useState([]);
  const userId = localStorage.getItem('v09userInfoId');
  useEffect(()=>{
    if(userId){
      getUserData();
    }
    if(aboutContentRef){
      setShowSeeMoreButton(aboutContentRef.current.scrollHeight !== aboutContentRef.current.clientHeight)
    }
  },[])
  const falseToastify = () => {
    setUploadedSuccessful(false);
    setUploadingFailed(false);
  }
  const getUserData = async() => {
  try{
    const rawResponse = await fetch(`${backend_url}user/getuserdata/${userId}`,{
      method : 'get',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const response = await rawResponse.json();
    const { user } = response;
    if(user){
      const { name:dbName, _id, location:dbLocation, post:dbPost, about:dbAbout, heading:dbHeading, email, avatar, experience:dbExperience, education:dbEducation, skill:dbSkill, followers:dbFollowers} = user;
    
      setEducation(dbEducation);
      setExperience(dbExperience);
      setSkill(dbSkill);
      setAbout(dbAbout);
      setName(dbName);
      setHeading(dbHeading);
      setProfileImage(avatar);
      setLocation(dbLocation);
      setFollowers(dbFollowers);
      setPost(dbPost);
    }else{
      navigate('/signin');
    }
  }catch(error){
    navigate('/404error');
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
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsShowUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };
  const handleUpload = async() => {
    const data = new FormData();
    data.append("file",profileImage);
    data.append("upload_preset","profile_images");
    data.append("cloud_name","dgdnyeo0y");

    try{
      setIsLoading(true);
      let response = await fetch("https://api.cloudinary.com/v1_1/dgdnyeo0y/image/upload",{
        method:'post',
        body:data
      })
      response = await response.json();
      const { secure_url } = response;
      if(secure_url){
        const rawResult = await fetch(`${backend_url}user/uploadprofileimg/${userId}`,{
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({url:secure_url})
        }) 
        const result = await rawResult.json();
        if(result.status===true){
          setUploadedSuccessful(true);
          setIsShowUpload(false);
          setProfileImage(secure_url);
          getUserData();
        }else{
          setUploadingFailed(true);
        }
        setIsLoading(false);
      }
    }catch(error){
      setUploadingFailed(true);
      setIsLoading(false);
    }
    
  }
  const deletePost = async(userId, postId) => {
    try{
      const response = await axios.delete(`${backend_url}post/deletepost/${postId}/${userId}`);
      getUserData();
    }catch(error){
      navigate('/servererror');
    }

  }
  return (
    <div className='h-full'>
      <div className='h-[auto] pb-3 bg-white rounded-lg'>
        <div className='h-36 relative rounded-sm bg-[#e6e6e6] flex place-items-center justify-center'>
          <img src={EngineerLinkLogo} className='h-9' alt="" />
          <form>
            <div className='p-1 profile_div bg-white absolute max-h-34 max-w-36 min-w-34 min-w-36  top-[30%] left-6 rounded-full overflow-hidden'>
                <img src={profileImage} className='Avatar cursor-pointer' alt="" onClick={triggerFileInput}/>
                <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
                onChange={handleImageChange} 
                accept="image/*"
              />
            </div>
          </form>
        </div>
        {uploadedSuccessful && <Toastify deActivate={falseToastify} time={5000} msg={'Profile images uploaded!'}/>}
        {uploadingFailed &&  <ErrorToastify deActivate={falseToastify} time={3000} msg={'Image uploading failed! Try Again'}/>}  
        <div className='mt-14 pl-7 '>
            {isShowUpload && <Button className="bg-mainColor mb-1 ml-6" onClick={handleUpload}>{isLoading?<Loader color={'white'}/>:'upload'}</Button>}
          <div className='relative'><label htmlFor="" className='font-medium text-2xl'>{name}</label><label htmlFor="" className="absolute top-[-50%] right-6 hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><DialogDemo getUserData={getUserData} userId={userId} name={name} heading={heading} location={location} title={'Basic Detail'}/></label></div>
          <div className='max-w-[70%] subHeading'><label htmlFor="" className='opacity-70'>{heading}</label></div>
          <div><label htmlFor="" className='text-sm opacity-50'>{location}</label></div>
          <div><Link to="/mynetwork" className='text-sm text-[#2174c8] cursor-pointer'>{name} Network's</Link></div>
        </div>
      </div>

      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
        <div className='flex justify-between px-6 py-2'>
          <label htmlFor="" className='font-medium text-xl'>Activity</label>
          <label htmlFor="" className='px-2 rounded-2xl font-semibold cursor-pointer hover:text-white transition-all hover:bg-[#2174c8] py-1 border-[#2174c8] text-[#2174c8] border-2'><CreatePost getUserData={getUserData} title={'Create a post'} localUserId={userId} name={name} profileImage={profileImage}/></label>
        </div>
        <div className='pl-6'>
          <label htmlFor="" className='px-3 py-1 rounded-lg bg-green-700 text-white font-semibold'>Post</label>
        </div>

        {/* post design */}
        {
          post && post?.length > 0 ? 
          post.map((elm)=>{
            return <div className='relative'>
              <Link key={elm.postId._id} to={`/seepost/${elm.postId._id}/${userId}`} className='pl-7 pt-10 items-center flex gap-3 relative'>
               <label htmlFor="" className='absolute top-[14%] text-[.8rem] opacity-50'>{name} posted this</label>
               <div className='post_img_div overflow-hidden min-h-[4rem] min-w-[4rem] max-h-[5rem] max-w-[5rem]'>
                 <img src={elm.postId.postimage} alt="" className='rounded-lg min-h-[4rem] min-w-[4rem] max-h-[5rem] max-w-[5rem]'/>
               </div>
               <div className='relative max-w-[88%] min-h-[4rem] max-h-[5rem] overflow-hidden'>
                 <label htmlFor="" className='inline-block max-w-[90%] opacity-60 ' style={postSeeMoreStyle}>
                   {elm.postId.posttitle}
                 </label>
               </div>
             </Link>
                 <div className='absolute top-[40%] right-10'>
                  <label htmlFor="" onClick={()=>deletePost(userId, elm.postId._id)} className='cursor-pointer'><MdDelete color='red' className='hover:scale-125 transition-all' fontSize={'1.2rem'}/></label>
                 </div>
              <div className='w-[96%] pl-6 mt-2'>
                 <hr />
              </div>
         </div>
          })
          : 
        <div className='flex justify-center '>
          <label htmlFor="" className=' px-2 py-[1px]  rounded-sm'>No post yet!</label>
        </div>
        }
        {/* end */}
      </div>

      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>About</label>
            <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><DialogDemo getUserData={getUserData} userId={userId} aboutContent={about} title={'About'}/></label>
          </div>
          <div className='relative pl-6  w-[70%]'>
            <label ref={aboutContentRef} htmlFor="" style={isOpen?null:seeMoreStyle}>{about}</label>
            {showSeeMoreButton && <button className='absolute bottom-0 right-[-10%] opacity-70' onClick={()=>setIsOpen(!isOpen)}>{isOpen?'see less':'see more'}</button>}
          </div>
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Educations</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><DialogDemo getUserData={getUserData} userId={userId} type={'plus'} title={'Add Educations'}/></label>
            </div>
          </div>
          {
            education?.length > 0 ? education.map((elm, index)=>{
              return <ProfileSection key={index} userId={userId} getUserData={getUserData} title={'education'} uniqueId={elm._id} icon={<LuSchool fontSize={'2.4rem'}/>} subTitle={elm.school} description={elm.field}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Education Added! Please Add</label>
            </div>
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Experience</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><DialogDemo getUserData={getUserData} userId={userId} type={'plus'} title={'Add Experience'}/></label>
            </div>
          </div>
          {
            experience?.length > 0 ? experience.map((elm, index)=>{
              return <ProfileSection key={index} userId={userId} getUserData={getUserData} title={'experience'} uniqueId={elm._id} icon={<GiSkills fontSize={'2.4rem'}/>} subTitle={elm.company} description={elm.description}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Experience Added! Please Add</label>
            </div>
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Skills</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><DialogDemo getUserData={getUserData} userId={userId} type={'plus'} title={'Add Skills'}/></label>
            </div>
          </div>
          {
            skill?.length > 0 ? skill.map((elm, index)=>{
              return <ProfileSection key={index} userId={userId} getUserData={getUserData} title={'Skill'} uniqueId={elm._id} subTitle={elm.skillname} description={elm.description}/>
            }):
            <div className='flex justify-center '>
              <label htmlFor="" className='bg-[#ddd] px-2 py-[1px]  rounded-sm'>No Skill Added! Please Add</label>
            </div>
          }
      </div>

      
      
    </div>
  )
}

const ProfileSection = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const handleDelete = async(uniqueId, apiName, userId) => {
    const rawResponse = await fetch(`${backend_url}user/delete${apiName}/${userId}/${uniqueId}`);
    const response = await rawResponse.json();
    if(response.status){
      props.getUserData();
    }else{
      alert('failed');
    }
  }
  return(
    <>
 
          <div className='pl-6 mb-3  w-[100%] flex items-center'>
            <label htmlFor="">{props.icon}</label>
            <div className='ml-2 w-full'>
              <div className='relative '>
                <label htmlFor="" className='font-normal inline-block max-w-[90%]'>{props.subTitle}</label>
                <label onClick={()=>handleDelete(props.uniqueId, props.title, props.userId)} htmlFor="" className="hover:bg-[#ddd] absolute right-6 transition-all p-3 cursor-pointer rounded-full"><MdDelete color='red' fontSize={'1.3rem'}/></label>
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

 function DialogDemo(props) {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const { getUserData } = props;
  const aboutRef = useRef();
  const educationRefSchool = useRef();
  const educationRefField = useRef();
  const experienceRefCompany = useRef();
  const experienceRefDescription = useRef();
  const skillRef = useRef();
  const addEducationRefSchool = useRef();
  const addEducationRefField = useRef();
  const addExperienceRefCompany = useRef();
  const addExperienceRefDescription = useRef();
  const addSkillRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const[emptyAlert,setEmptyAlert] = useState(false);
  const [name, setName] = useState('');
  const [heading, setHeading] = useState('');
  const [location, setLocation] = useState('');
  // var nameRef = useRef();
  // var headingRef = useRef();
  // var locationRef = useRef();

  function hasKeys(obj, keys) {
    return keys.every(key => obj.hasOwnProperty(key));
  }
    useEffect(() => {
      if (hasKeys(props, ['name', 'heading', 'location'])) {
        setName(props.name);
        setHeading(props.heading);
        setLocation(props.location);
      }
    }, [props]);
  

  const falseIsDataSaved = () => {
    setIsDataSaved(false);
  }

  const submitHandler = async(firstValue, secondValue, thirdValue, isDoubleField, isTripleField, isDelete, apiName, userId) => {
    // for the edit section
    if(!isDelete){
      if(isDoubleField){
        if(firstValue.current.value.length>0 && secondValue.current.value.length>0){
          setIsLoading(true);
          const rawResponse = await fetch(`${backend_url}user/${apiName}/${userId}`,{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({firstValue:firstValue.current.value,secondValue:secondValue.current.value})
          })
          const response = await rawResponse.json();
          setIsLoading(false);
          if(response.status===true){
            setIsDataSaved(true);
            getUserData();
          }
      }else{
        setEmptyAlert(true);
      }
      }else if(isTripleField){
        if(firstValue.length>0 && secondValue.length>0 && thirdValue.length>0){
          setIsLoading(true);
          const rawResponse = await fetch(`${backend_url}user/${apiName}/${userId}`,{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({firstValue:firstValue,secondValue:secondValue,thirdValue:thirdValue})
          })
          const response = await rawResponse.json();
          setIsLoading(false);
          if(response.status===true){
            setIsDataSaved(true);
            getUserData();
          }
      }else{
        setEmptyAlert(true);
      } 
      }
      else if(!isDoubleField){
        if(firstValue.current.value.length > 0){
          if(apiName==='about'){
            setIsLoading(true);
            const rawResponse = await fetch(`${backend_url}user/setabout/${userId}`,{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({about:firstValue.current.value})
            })
            const response = await rawResponse.json();
            setIsLoading(false);
            if(response.status===true){
              setIsDataSaved(true);
              getUserData();
            }
          }else if(apiName==='addskill'){
            setIsLoading(true);
            const rawResponse = await fetch(`${backend_url}user/addskill/${userId}`,{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({skillname:firstValue.current.value})
            })
            const response = await rawResponse.json();
            setIsLoading(false);
            if(response.status===true){
              setIsDataSaved(true);
              getUserData();
            }
          }
        }else{
          setEmptyAlert(true)
        }
      }
    }
    // for the delete section 
    else if (isDelete){

    }
  }
  return (
    <Dialog >
      <DialogTrigger onClick={()=>setIsDataSaved(false)} asChild className=''>
        <label htmlFor="" className="hover:bg-[#ddd] transition-all cursor-pointer ">{props.type==='plus'?<IoMdAdd fontSize={'1.4rem'}/>:<GoPencil fontSize={'1.4rem'}/>}</label>
      </DialogTrigger>
      <DialogContent falseIsDataSaved={falseIsDataSaved} className="dialog_content sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.type==='plus'?props.title:"Edit " + props.title}</DialogTitle>
          <DialogDescription>
            {props.type === 'plus'?'fill both of the field and click the save button.': `Make changes to your ${props.title} here. Click save when you are done.`}
          </DialogDescription>
        </DialogHeader>
        {
          props.title === 'About' ?
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(aboutRef, null, null, false, false, false,'about',props.userId)}}>
                {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
            <div>
              <textarea ref={aboutRef} name="" className='border focus:border-slate-500 focus:outline-none rounded-sm resize-none w-full p-2 text-[.9rem]'  cols={10} id="">{props.aboutContent}</textarea>
            </div>
            <DialogFooter> 
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          : props.title === 'Basic Detail' ? 
          <>
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(name, heading, location, false, true , false,'setbasicdetail', props.userId)}}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                SubHeading
              </Label>
              <Input
                id="username"
                value={heading}
                onChange={(event)=>setHeading(event.target.value)}
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Location
              </Label>
              <Input
                id="username"
                value={location}
                onChange={(event)=>setLocation(event.target.value)}
                className="col-span-3"
                />
            </div>
          </div>
          <DialogFooter> 
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          </>
          : props.title === 'Educations' ? 
          <>
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(educationRefSchool, educationRefField, null, true, false, true)}}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                School/College
              </Label>
              <Input
                id="name"
                ref={educationRefSchool}
                value={props.subTitle}
                className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Field of Study
              </Label>
              <Input
                id="username"
                value={props.description}
                ref={educationRefField}
                className="col-span-3"
                />
            </div>
          </div>
          <DialogFooter> 
                      {props.type!=='plus' && <SubmitButton isDataSaved={isDataSaved} color={'red'} isLoading={isLoading}/>}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          </>
          : props.title === 'Experience' ?
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(experienceRefCompany, experienceRefDescription, null, true, false, true)}}>
            <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="name"
                    ref={experienceRefCompany}
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    ref={experienceRefDescription}
                    className="col-span-3"
                  />
                </div>
          </div>
          <DialogFooter> 
                      {props.type!=='plus' && <SubmitButton isDataSaved={isDataSaved} color={'red'} isLoading={isLoading}/>}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          :
           props.title === 'Skills' ?
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(skillRef, null, null, false, false, true)}}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-6">
              <Label htmlFor="name" className="text-right">
                Skill
              </Label>
              <Input
                id="name"
                ref={skillRef}
                className="col-span-3"
              />
              <Button>Add</Button>
            </div>
          </div>
          <DialogFooter> 
                      {props.type!=='plus' && <SubmitButton isDataSaved={isDataSaved} color={'red'} isLoading={isLoading}/>}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          : ''
        }
          {props.type === 'plus' ?
            props.title === 'Add Educations'?
            <form onSubmit={(e)=>{e.preventDefault(); submitHandler(addEducationRefSchool, addEducationRefField, null, true, false, false, 'addeducation', props.userId)}}>
                <div className="grid gap-4 py-4">
                {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    School/College
                  </Label>
                  <Input
                    id="name"
                    ref={addEducationRefSchool}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Field of Study
                  </Label>
                  <Input
                    id="username"
                    ref={addEducationRefField}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter> 
                      {props.type!=='plus' && <SubmitButton isDataSaved={isDataSaved} color={'red'} isLoading={isLoading}/>}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
            :
            props.title === 'Add Experience'?
            <form onSubmit={(e)=>{e.preventDefault(); submitHandler(addExperienceRefCompany, addExperienceRefDescription, null, true, false, false, 'addexperience', props.userId)}}>
                {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="name"
                    ref={addExperienceRefCompany}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    ref={addExperienceRefDescription}
                    className="col-span-3"
                  />
                </div>
          </div>
          <DialogFooter> 
                      {props.type!=='plus' && <SubmitButton isDataSaved={isDataSaved} color={'red'} isLoading={isLoading}/>}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
         
            </form>
            :
            props.title === 'Add Skills'?
            <>
              <form onSubmit={(e)=>{e.preventDefault();submitHandler(addSkillRef, null, null, false, false, false, 'addskill',props.userId)}}>
              {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
                          <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-6">
                          <Label htmlFor="name" className="text-right">
                            Skill
                          </Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            ref={addSkillRef}
                          />
                        </div>
                      </div>
          
                    <DialogFooter> 
                      {props.type!=='plus' && <Button type="submit" className="bg-[red]">Delete</Button>}
                      {/* <Button type="submit" className="bg-mainColor">Save changes</Button> */}
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
                    </DialogFooter>
              </form>
            </>
            :''
            :''
          }
        
      </DialogContent>
    </Dialog>
  )
}

const SubmitButton = ({color, type, isLoading, isDataSaved}) => {
  return(
    <Button type="submit" disabled={isDataSaved?true:false} className={color==='red'?"bg-[red]":"bg-mainColor"}>{isLoading?<Loader color={'white'}/>:color==='red'?'Delete':isDataSaved?'Saved':type==='plus'?'   Add   ':'Save changes'}</Button>
  )
}
export default Profile
