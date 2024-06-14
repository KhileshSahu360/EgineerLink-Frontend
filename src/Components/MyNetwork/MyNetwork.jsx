import React, { useEffect, useState } from "react";
import './MyNetwork.css'
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userDetailAction } from "../Store/Store";

const MyNetwork = () => {
  const dispatch = useDispatch();
  const localUserId = localStorage.getItem('v09userInfoId');
  const navigate = useNavigate();
  const [item, setItem] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const [allUserData, setAllUserData] = useState(null);
  const [localUserData, setLocalUserData] = useState(null);
  const [allUserDataForPeople, setAllUserDataForPeople] = useState(null);
  const fetchData = () => {
    setTimeout(()=>{
      const newItem = Array.from({length:20},(_,i)=>`Item ${item.length + i + 1}`);
      setItem(prevItem=>[...prevItem,...newItem]);
      if(item.length>100){
        setHasMore(false);
      }
    },1000);
  }
  useEffect(()=>{
      getData();
  },[])
  const getData = async() => {
    const users = await getUsers();
    const localUser = await getLocalUserData();
    if(users.length > 0 && localUser){
      const newUsers = users.filter((elm)=>{
        return !localUser.following.some(obj => obj._id === elm._id);
      })
      setAllUserDataForPeople(newUsers);
    }
  }
  const getUsers = async() => {
    try{
      const response = await axios.get(`http://localhost:3000/user/getalluser/${localUserId}`)
      if(response.status === 200 && response.data.users ){
        setAllUserData(response.data.users);
        return response.data.users;
      }
    }catch(error){
      navigate('/servererror');
    }
    
  }
  const getLocalUserData = async() => {
    try{
      const response = await axios.get(`http://localhost:3000/user/getuserdata/${localUserId}`)
      if(response.status === 200 && response.data.user){
        setLocalUserData(response.data.user);
        dispatch(userDetailAction.setDetail(response.data.user));
        return response.data.user;
      }
    }catch(error){
      navigate('/servererror');

    }
  }
  return (
    <InfiniteScroll
  dataLength={item.length} //This is important field to render the next data
  next={fetchData}
  hasMore={hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
    <Tabs
      defaultValue="followers"
      className="w-full flex flex-col place-items-center"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="followers">Follower's</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="peoples">People's</TabsTrigger>
      </TabsList>
      <TabsContent value="followers" className="w-[70%] tab_content">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Follower's</CardTitle>
          </CardHeader>
          {
            localUserData && localUserData.followers.length >0 ? localUserData.followers.map((elm)=>{
              return <FollowerDesign localUserData={localUserData} localUserId={localUserId} _id={elm._id} name={elm.name} heading={elm.heading} avatar={elm.avatar} getData={getData}/>
            })
          :
            <div className="text-center pb-4">
              <label htmlFor="" className="font-bold">No Follwers!</label>
            </div>
          }
          </Card>
      </TabsContent>
      <TabsContent value="following" className="w-[70%] tab_content">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Following</CardTitle>
          </CardHeader>
          {
            localUserData && localUserData.following.length >0 ? localUserData.following.map((elm)=>{
              return <FollowingDesign localUserData={localUserData} localUserId={localUserId} _id={elm._id} name={elm.name} heading={elm.heading} avatar={elm.avatar} getData={getData}/>
            })
          :
            <div className="text-center pb-4">
              <label htmlFor="" className="font-bold">No Following!</label>
            </div>
          }
        </Card>
      </TabsContent>
      <TabsContent value="peoples" className="w-[70%] tab_content">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>People's</CardTitle>
              <div className="people_container grid grid-cols-3 w-full gap-4 place-items-center pt-4">
       
              {allUserDataForPeople && allUserDataForPeople.length > 0 &&  allUserDataForPeople.map((elm)=>{
                
                return <PeopleCardDesign key={elm._id} getData={getData} localUserData={localUserData} localUserId={localUserId} name={elm.name} avatar={elm.avatar} heading={elm.heading} _id={elm._id}/>
              })}
            </div>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
    </InfiniteScroll>
  );
};

const FollowerDesign = (props) => {
  useEffect(()=>{
  },[props])
  const unFollowHandler = async(localUserId, newUserId) => {
    try{
      
        const response = await axios.put(`http://localhost:3000/user/removeuserfromfollower/${localUserId}/${newUserId}`);
        props.getData();
    }catch(error){
      navigate('/servererror')
    }
  }
  return (
    <div className="flex p-2 w-[90%] items-center gap-2  mx-[5%] mb-2">
      <Link to={`/seeuserprofile/${props._id}`}>
      <Avatar>
        <AvatarImage src={props.avatar} alt="@shadcn" />
        <AvatarFallback>{props.name.charAt(0)}</AvatarFallback>
      </Avatar>
      </Link>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <label htmlFor="" className="font-medium">
            {props.name}
          </label>
          <label htmlFor="" className="text-[.7rem]">
            {props.heading.length<=24?props.heading:`${props.heading.substring(0,24)}...`}

          </label>
        </div>
        <div className="mr-1">
          <button
            onClick={()=>unFollowHandler(props.localUserId, props._id)}
            className="py-1 px-3 font-medium rounded-md bg-instaWhiteColor"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const FollowingDesign = (props) => {
  const [isFollowed, setIsFollowed] = useState(true);
  useEffect(()=>{
    const res = props.localUserData.following.some(obj => obj._id === props._id);
    // const res = props.localUserData.following.includes(props._id);
    setIsFollowed(res);
  },[props])
  const followingHandler = async(localUserId, newUserId) => {
    try{
      if(isFollowed){
        const response = await axios.put(`http://localhost:3000/user/unfollowuser/${localUserId}/${newUserId}`);
        props.getData();
      }else{
        const response = await axios.put(`http://localhost:3000/user/followuser/${localUserId}/${newUserId}`);
        props.getData();
      }
    }catch(error){
      navigate('/servererror')
    }
  }
  return (
    <div className="flex p-2 w-[90%] items-center gap-2  mx-[5%] mb-2">
      <Link to={`/seeuserprofile/${props._id}`}>
      <Avatar>
        <AvatarImage src={props.avatar} alt="@shadcn" />
        <AvatarFallback>{props.name.charAt(0)}</AvatarFallback>
      </Avatar>
      </Link>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <label htmlFor="" className="font-medium">
            {props.name}
          </label>
          <label htmlFor="" className="text-[.7rem]">
            {props.heading.length<=24?props.heading:`${props.heading.substring(0,24)}...`}

          </label>
        </div>
        <div className="mr-1">
          <button onClick={()=>followingHandler(props.localUserId, props._id)} style={isFollowed?{background:'#efefef',color:'black'}:{background:'#0195f7',color:'white'}} className="py-1 px-3 font-medium rounded-md ">
            {isFollowed?'Following':'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PeopleCardDesign = (props) => {
  const [isFollowed, setIsFollowed] = useState(null);
  useEffect(()=>{
    // const res = props.localUserData.following.some(obj => obj._id === props._id);
    // const res = props.localUserData.following.includes(props._id);
    // setIsFollowed(res);
  },[props])
  const followHandler = async(localUserId, newUserId) => {
    try{
      if(isFollowed){
        const response = await axios.put(`http://localhost:3000/user/unfollowuser/${localUserId}/${newUserId}`);
        props.getData();
      }else{
        const response = await axios.put(`http://localhost:3000/user/followuser/${localUserId}/${newUserId}`);
        props.getData();
      }
    }catch(error){
      navigate('/servererror')
    }
  }
  return (
     <div className="people_card_container border border-mainColor  shadow-lg  h-[10rem] w-[9rem] rounded-md flex flex-col justify-center items-center">
        <Link to={`/seeuserprofile/${props._id}`}>
          <Avatar className="w-auto h-[3.5rem]">
            <AvatarImage src={props.avatar} alt="@shadcn" />
            <AvatarFallback>{props.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col items-center">
          <label htmlFor="" className="text-[.9rem] font-medium">
            {props.name.length<=14?props.name:`${props.name.substring(0,14)}...`}
          </label>
          <label
            htmlFor=""
            className="text-[.7rem] text-wrap inline-block w-[90%] text-center mt-[-4px] opacity-70"
          >
            {props.heading.length<=24?props.heading:`${props.heading.substring(0,24)}...`}
          </label>
        </div>
        <button onClick={()=>followHandler(props.localUserId, props._id)} style={{background:'#0195f7',color:'white'}} className=" text-white py-[1px] text-center px-8 mt-2  font-medium rounded-md">
          Follow
        </button>
      </div>
  );
};
export default MyNetwork;
