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



const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSeeMoreButton,setShowSeeMoreButton] = useState(false);
  const aboutContentRef = useRef(null);
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState([{subTitle:'boys school',description:'higher secondary'},{subTitle:'polytechnic college',description:'higher secondary'}]); 
  const [experience, setExperience] = useState([{subTitle:'i have one month good experience in web development',description:'SEED IT SOLUTION'},{subTitle:'1 year experince in riverhouse technology',description:'RIVERHOUSE TECHNOLOGY'}]); 
  const [skill, setSkill] = useState([{subTitle:'MongoDB',description:'1 Month good'},{subTitle:'ExpressJS',description:'1 Month good'}]); 
  const userId = localStorage.getItem('v09userInfoId');
  useEffect(()=>{
    // console.log(userId);
    if(userId){
      getUserData();
    }
    if(aboutContentRef){
      setShowSeeMoreButton(aboutContentRef.current.scrollHeight !== aboutContentRef.current.clientHeight)
    }
  },[])
  const getUserData = async() => {
    const rawResponse = await fetch(`http://localhost:3000/user/getuserdata/${userId}`,{
      method : 'get',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const response = await rawResponse.json();
    const { user } = response;
    console.log(user);
    const { name, about, email, experience:dbExperience, education:dbEducation, skill:dbSkill, followers} = user;
    setEducation(dbEducation);
    setExperience(dbExperience);
    setSkill(dbSkill);
    setAbout(about);
  }
  
  const seeMoreStyle = { 
    WebkitLineClamp:4,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    display:'-webkit-box'
  }
 
  return (
    <div className='h-full'>
      <div className='h-[auto] pb-3 bg-white rounded-lg'>
        <div className='h-36 relative rounded-sm bg-[#e6e6e6] flex place-items-center justify-center'>
          <img src={EngineerLinkLogo} className='h-9' alt="" />
          <div className='p-1 bg-white absolute top-[30%] left-6 rounded-full'>
            <img src={Avatar} className='h-36 Avatar' alt="" />
          </div>
        </div>
        <div className='mt-14 pl-7 '>
          <div className='relative'><label htmlFor="" className='font-medium text-2xl'>Khilesh Sahu</label><label htmlFor="" className="absolute top-[-50%] right-6 hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><GoPencil fontSize={'1.4rem'}/></label></div>
          <div className='max-w-[70%] subHeading'><label htmlFor="" className='opacity-70'>Mern Stack Web Developer|javascriptlsajkklfsjflksajflsakjfdlkj lksfjlk lksflksa lkjf </label></div>
          <div><label htmlFor="" className='text-sm opacity-50'>Chattisgarh, Bhilai</label></div>
          <div><label htmlFor="" className='text-sm text-[#2174c8] cursor-pointer'>612 followers</label></div>
        </div>
      </div>

      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
        <div className='flex justify-between px-6 py-2'>
          <label htmlFor="" className='font-medium text-xl'>Activity</label>
          <label htmlFor="" className='px-2 rounded-2xl font-semibold cursor-pointer hover:text-white transition-all hover:bg-[#2174c8] py-1 border-[#2174c8] text-[#2174c8] border-2'>Create a post</label>
        </div>
        <div className='pl-6'>
          <label htmlFor="" className='px-3 py-1 rounded-lg bg-green-700 text-white font-semibold'>Post</label>
        </div>
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
            education.length > 0 ? education.map((elm, index)=>{
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
            experience.length > 0 ? experience.map((elm, index)=>{
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
            skill.length > 0 ? skill.map((elm, index)=>{
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
  const handleDelete = async(uniqueId, apiName, userId) => {
    console.log(uniqueId, apiName, userId);
    const rawResponse = await fetch(`http://localhost:3000/user/delete${apiName}/${userId}/${uniqueId}`);
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
                <label htmlFor="" className='font-normal'>{props.subTitle}</label>
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

  const falseIsDataSaved = () => {
    setIsDataSaved(false);
  }
  const submitHandler = async(firstValue, secondValue, isDoubleField, isDelete, apiName, userId) => {
    // for the edit section
    if(!isDelete){
      if(isDoubleField){
        if(firstValue.current.value.length>0 && secondValue.current.value.length>0){
          console.log(userId);
          setIsLoading(true);
          const rawResponse = await fetch(`http://localhost:3000/user/${apiName}/${userId}`,{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({firstValue:firstValue.current.value,secondValue:secondValue.current.value})
          })
          const response = await rawResponse.json();
          setIsLoading(false);
          console.log(response);
          if(response.status===true){
            setIsDataSaved(true);
            getUserData();
          }
      }else{
        setEmptyAlert(true);
      }
      }else if(!isDoubleField){
        if(firstValue.current.value.length > 0){
          if(apiName==='about'){
            setIsLoading(true);
            const rawResponse = await fetch(`http://localhost:3000/user/setabout/${userId}`,{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({about:firstValue.current.value})
            })
            const response = await rawResponse.json();
            setIsLoading(false);
            console.log(response);
            if(response.status===true){
              setIsDataSaved(true);
              getUserData();
            }
          }else if(apiName==='addskill'){
            setIsLoading(true);
            const rawResponse = await fetch(`http://localhost:3000/user/addskill/${userId}`,{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({skillname:firstValue.current.value})
            })
            const response = await rawResponse.json();
            setIsLoading(false);
            console.log(response);
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
      <DialogContent falseIsDataSaved={falseIsDataSaved} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.type==='plus'?props.title:"Edit " + props.title}</DialogTitle>
          <DialogDescription>
            {props.type === 'plus'?'fill both of the field and click the save button.': "Make changes to your props.title here. Click save when you are done."}
          </DialogDescription>
        </DialogHeader>
        {
          props.title === 'About' ?
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(aboutRef, null, false, false,'about',props.userId)}}>
                {emptyAlert && <Alerts types={'error'} msg={'Please fill all the Field!'} status={setEmptyAlert}/>}
            <div>
              <textarea ref={aboutRef} name="" className='border focus:border-slate-500 focus:outline-none rounded-sm resize-none w-full p-2 text-[.9rem]'  cols={10} id="">{props.aboutContent}</textarea>
            </div>
            <DialogFooter> 
                      <SubmitButton type={props.type} isDataSaved={isDataSaved} isLoading={isLoading}/>
          </DialogFooter>
          </form>
          : props.title === 'Educations' ? 
          <>
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(educationRefSchool, educationRefField, true, true)}}>
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
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(experienceRefCompany, experienceRefDescription, true, true)}}>
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
          <form onSubmit={(e)=>{e.preventDefault(); submitHandler(skillRef, null, false, true)}}>
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
            <form onSubmit={(e)=>{e.preventDefault(); submitHandler(addEducationRefSchool, addEducationRefField, true, false, 'addeducation', props.userId)}}>
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
            <form onSubmit={(e)=>{e.preventDefault(); submitHandler(addExperienceRefCompany, addExperienceRefDescription, true, false, 'addexperience', props.userId)}}>
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
              <form onSubmit={(e)=>{e.preventDefault();submitHandler(addSkillRef, null, false, false, 'addskill',props.userId)}}>
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
    <Button type="submit" disabled={isDataSaved?true:false} className={color==='red'?"bg-[red]":"bg-mainColor"}>{isLoading?<Loader/>:color==='red'?'Delete':isDataSaved?'Saved':type==='plus'?'   Add   ':'Save changes'}</Button>
  )
}
export default Profile
