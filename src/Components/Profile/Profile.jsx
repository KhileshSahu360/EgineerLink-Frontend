import React, { useEffect, useRef, useState } from 'react'
import EngineerLinkLogo from '../../assets/logo/EngineerLinkLogo.svg'
import Avatar from "../../assets/image/Avatar.png";
import { GoPencil } from "react-icons/go";
import { LuSchool } from "react-icons/lu";
import { GiSkills } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import './Profile.css';
import { Button } from '../ui/button';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSeeMoreButton,setShowSeeMoreButton] = useState(false);
  const aboutContentRef = useRef(null);
  const [education, setEducation] = useState([{subTitle:'boys school',description:'higher secondary'},{subTitle:'polytechnic college',description:'higher secondary'}]); 
  const [experience, setExperience] = useState([{subTitle:'i have one month good experience in web development',description:'SEED IT SOLUTION'},{subTitle:'1 year experince in riverhouse technology',description:'RIVERHOUSE TECHNOLOGY'}]); 
  const [skill, setSkill] = useState([{subTitle:'MongoDB',description:'1 Month good'},{subTitle:'ExpressJS',description:'1 Month good'}]); 
  useEffect(()=>{
    if(aboutContentRef){
      setShowSeeMoreButton(aboutContentRef.current.scrollHeight !== aboutContentRef.current.clientHeight)
    }
  },[])
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
            <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><GoPencil fontSize={'1.4rem'}/></label>
          </div>
          <div className='relative pl-6  w-[70%]'>
            <label ref={aboutContentRef} htmlFor="" style={isOpen?null:seeMoreStyle}>hii my nadgfdgdgdgd Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, vero ducimus! Illo optio obcaecati eos qui ea natus dolorem beatae animi nam? Rem blanditiis sit soluta quae dolores qui doloremque minima modi ullam molestias maiores, velit eveniet quibusdam. Iusto rem reiciendis provident quis doloribus facilis culpa quam alias nihil quia! me Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illo aperiam excepturi optio unde facilis nisi cupiditate recusandae quod iste reiciendis  illum rem deserunt enim! Quaerat nihil,  corrupti quo umquam, autem.</label>
            {showSeeMoreButton && <button className='absolute bottom-0 right-[-10%] opacity-70' onClick={()=>setIsOpen(!isOpen)}>{isOpen?'see less':'see more'}</button>}
          </div>
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Educations</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><IoMdAdd fontSize={'1.4rem'}/></label>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><GoPencil fontSize={'1.4rem'}/></label>
            </div>
          </div>
          {
            education.map((elm, index)=>{
              return <ProfileSection title={'Educations'} icon={<LuSchool fontSize={'2.4rem'}/>} subTitle={elm.subTitle} description={elm.description}/>
            })
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Experience</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><IoMdAdd fontSize={'1.4rem'}/></label>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><GoPencil fontSize={'1.4rem'}/></label>
            </div>
          </div>
          {
            experience.map((elm, index)=>{
              return <ProfileSection title={'Experience'} icon={<GiSkills fontSize={'2.4rem'}/>} subTitle={elm.subTitle} description={elm.description}/>
            })
          }
      </div>
      <div className='h-[auto] mt-3 pb-3 bg-white rounded-lg'>
          <div className='flex justify-between px-6 py-2'>
            <label htmlFor="" className='font-medium text-xl'>Skills</label>
            <div className='flex gap-1'>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><IoMdAdd fontSize={'1.4rem'}/></label>
              <label htmlFor="" className="hover:bg-[#ddd] transition-all p-3 cursor-pointer rounded-full"><GoPencil fontSize={'1.4rem'}/></label>
            </div>
          </div>
          {
            skill.map((elm, index)=>{
              return <ProfileSection title={'Skills'} subTitle={elm.subTitle} description={elm.description}/>
            })
          }
      </div>

      
      
    </div>
  )
}

const ProfileSection = (props) => {
  return(
    <>
 
          <div className='pl-6 mb-3  w-[70%] flex items-center'>
            <label htmlFor="">{props.icon}</label>
            <div className='ml-2'>
              <label htmlFor="" className='font-normal'>{props.subTitle}</label>
              <p htmlFor="" className='opacity-50 mt-[-.1rem]'>{props.description}</p>
            </div>
          </div>
          <div className='px-7 mb-2'>
            <hr />
          </div>
    </>
  )
}
export default Profile
