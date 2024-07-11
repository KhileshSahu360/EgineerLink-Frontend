import "./Home.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Post from '../Post/Post'
import Toppost from "./Toppost";
import Button from '@mui/material/Button'; // Import Button from @mui/material
import LogoutIcon from '@mui/icons-material/Logout';
import Loader, { FadLoader } from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userDetailAction, dataFetchedStatusAction, postAction } from "../Store/Store";
import { useSelector } from "react-redux";
import { AlertDialog } from "../ui/alert-dialog";
import Logout from "../Profile/Logout";
import InfiniteScroll from 'react-infinite-scroll-component';


const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

// Define Postcont as a component
function Postcont(props) {
    const [demo, setDemo] = React.useState(false);
    React.useEffect(()=>{
        setDemo(true);
    },[])
    return (
        <Item style={{ marginTop: '20px' }} className="w-[80%] item_post">
            <div className="proright">
                <div>
                    <Post postData={props} demo={demo} getPost={props.getPost}/>
                </div>
            </div>
        </Item>
    );
}

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { homeDataStatus } = useSelector(store => store.dataFetchedStatusSlice);
    const { postData, isPostResult, isUserResult, userData, getOnlyUserData } = useSelector(store => store.postSlice)
    const [isLoading, setIsLoading] = React.useState(false);
    const [DumyPostData, setDumyPostData] = React.useState([]);
    const [localUserId, setLocalUserId] = React.useState(() => localStorage.getItem('v09userInfoId'));
    const [hasMore, setHasMore] = React.useState(true);
    const [excludeIds, setExcludeIds] = React.useState([]);

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    React.useEffect(() => {
        document.title = "Home";
        const checkLocalStorage = () => {
          const userId = localStorage.getItem('v09userInfoId');
          if (userId) {
            setLocalUserId(userId);
          }
        };
    
        const intervalId = setInterval(checkLocalStorage, 1000); // Check every 1 second
    
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      }, []);
  
      React.useEffect(() => {
        if(!homeDataStatus){
         if (localUserId) {
                setIsLoading(true);
                getAllPost(true);
                getUserData();
                setIsLoading(false);
            }
        }
        if(getOnlyUserData){        
            getUserData();
        }
      }, [localUserId]);
  
    const getAllPost = async(preventOrNot) => {
        try{
        const response = await fetch(`${backend_url}post/getallpost`,{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({excludeIds})
        });
        const data = await response.json();
        if(!data.error){
        const newPosts = data.post;
        // setPostData((prevPosts) => [...prevPosts, ...newPosts]);
        let dummyData;
        setDumyPostData((prevPosts) => {
            const existingPostIds = new Set(prevPosts.map(post => post._id));
            const filteredNewPosts = newPosts.filter(post => !existingPostIds.has(post._id));
            dummyData =  [...prevPosts, ...filteredNewPosts];
            return dummyData;
        });

        dispatch(postAction.setPostData(dummyData));

        setExcludeIds((prevExcludeIds) => [...prevExcludeIds, ...newPosts.map(post => post._id)]);
        
        setHasMore(newPosts.length > 0);
        }else{
            navigate('/404error');
        }
    }catch(error){
        navigate('/servererror');
    }
    if(preventOrNot){
        dispatch(postAction.setIsPostResult(true))
        dispatch(dataFetchedStatusAction.setHomeDataStatus(homeDataStatus))
    }
   
}
      

    const getUserData = async() => {
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
            dispatch(postAction.setUserData(user))
          }else{
            navigate('/signin');
          }
        }catch(error){
          navigate('/404error');
        }
        dispatch(postAction.setIsUserResult(true));
        if(getOnlyUserData){
            dispatch(postAction.setGetOnlyUserData(getOnlyUserData))
        }
    }

        const fetchMorePostData = (preventOrNot) => {
            getAllPost(preventOrNot);
        }
    return (
        <>
            {/* <InfiniteScroll
                dataLength={postData?.length} //This is important field to render the next data
                next={fetchMorePostData(false)}
                hasMore={hasMore}
                loader={<h4 className="text-center ">Loading...</h4>}
                endMessage={
                    <p className="no_post mt-4 ml-[10rem]" style={{ textAlign: 'center' }}>
                    <b>No more post!</b>
                    </p>
                }> */}
                {!isLoading ? <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Item>
                                <div className="proleft">
                                    <div className="protop"></div>
                                    <div className="probottom relative">
                                        <hr />
                                        <Link to={`/seeuserprofile/${localUserId}`} className="id"><img className="absolute top-[-100%] left-[35%]" src={userData.avatar} alt="profile" /></Link>
                                        <h1>{userData.name}</h1>
                                        <hr />
                                        <div className="btncen">
                                            <Logout/>
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Item className="welcome_container relative w-[80%]">
                                <div className="proright">
                                    <div>
                                        <Toppost getUserData={getUserData} localUserId={localUserId} name={userData.name} profileImage={userData.avatar}/>
                                    </div>
                                </div>
                            </Item>
                            <div>
                            </div>
                            <div className="w-full flex flex-col ">
                             {isPostResult && isUserResult && 
                                postData && postData.length > 0 && postData.map((elm, index)=>{
                                    return <Postcont key={index} getUserData={getUserData} localUserData={userData}  likedby={elm.likedby} localUserId={localUserId} _id={elm._id} posttitle={elm.posttitle} postimage={elm.postimage} postlike={elm.postlike} postcomment={elm.postcomment} author={elm.author}/>                                    

                                })
                            }   
                             </div>                         
                        </Grid>
                    </Grid>
                </Box> :
                    <div className="flex items-center justify-center h-[83vh] w-full ">
                        <FadLoader color={'gray'}/>
                    </div>
                }                  
                {/* </InfiniteScroll>  */}
                
                </>
    );
}

export {Postcont};