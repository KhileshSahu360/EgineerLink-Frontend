import { useState, useRef, useEffect } from "react";
import "./Post.css";
import heartIcon from '../../../public/heart.png'
import redHeartIcon from '../../../public/heart_red.png'
import commentIcon from '../../../public/comment.png'
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaArrowUpLong } from "react-icons/fa6";
import Loader, { CircleLoader } from "../Loader/Loader"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


function Post(props) {
    // const { localUserId } = useSelector((store)=>store.userDetailSlice);
    const [postComment, setPostComment] = useState('');
    const [showFullTitle, setShowFullTitle] = useState(false);
    const [showFoliowing,setShowFoliowing]=useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [localUserId, setLocalUserId] = useState('');
    const [addCommentText, setAddCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowAllComment, setIsShowAllComment] = useState(false);
    const [fullDetail, setFullDetail] = useState({});
    const [isFollowed, setIsFollowed] = useState(false);
    const [isOwnPost, setIsOwnPost] = useState(false);
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const textRef = useRef(null); // Create a ref for the text input

    useEffect(()=>{
        // props.postData.getUserData();
        setFullDetail(props.postData);
        setLocalUserId(props.postData.localUserId);
        const res = props.postData.likedby.includes(props.postData.localUserId);
        setIsLiked(res);
        const result = props.postData.localUserData.following.some(obj => obj._id);
        setIsFollowed(result);
        const isOwnResult = props.postData.localUserId === props.postData.author._id;
        setIsOwnPost(isOwnResult);
    },[props])

    const handleReadMoreClick = () => {
        setShowFullTitle(!showFullTitle);
    };

    const getSinglePost = async(_id) => {
        if(_id){
            try{
                const rawResponse = await fetch(`${backend_url}post/getsinglepost/${_id}`);
                const response = await rawResponse.json();
                const { post } = response;
                setFullDetail(post);
            }catch(error){

            }
        }
    }
    const handleLikeButtonClick = async(_id, userId) => {
        if(!isLiked){
            try{
                const response = await axios.put(`http://localhost:3000/post/incrementlike/${_id}/${userId}`)
                if(response.status === 200 && response.data.status === true){
                    getSinglePost(_id);
                }
            }catch(error){
                
            }
        }else{
            try{
                const response = await axios.put(`${backend_url}post/decrementlike/${_id}/${userId}`)
                if(response.status === 200 && response.data.status === true){
                    getSinglePost(_id);
                }
            }catch(error){
            }
        }
        setIsLiked(!isLiked);
    };
    
    const handleCommentClick = () => {
        // Focus on the text input when comment icon is clicked
        if (textRef.current) {
            textRef.current.focus();
        }
    };
    
    const handleAddComment = async(localUserId, _id) => {
        setIsLoading(true);
        const data = {
            comment : addCommentText
        }
        try{
            if(addCommentText.length > 0){
                const response = await axios.post(`${backend_url}post/addcomment/${_id}/${localUserId}`,data)
                if(response.status === 200 && response.data.status === true){
                    getSinglePost(_id);
                }
            }
        }catch(error){
            
        }
        setAddCommentText('');
        setIsLoading(false);
    }
    const handleFollow = async(localUserId, newUserId) => {
        try{
          if(isFollowed){
            const response = await axios.put(`${backend_url}user/unfollowuser/${localUserId}/${newUserId}`);
            props.postData.getUserData();
        }else{
            const response = await axios.put(`${backend_url}user/followuser/${localUserId}/${newUserId}`);
            props.postData.getUserData();
          }
        }catch(error){
          navigate('/servererror')
        }
      }
    return (
        <>
       { fullDetail.author && <div className="postbody ">
            <div className="post">
                <div className="top">
                    <Link to={`/seeuserprofile/${fullDetail.author._id}`} className="flex gap-2">
                        <div className="profileImg">
                            <Avatar>
                              <AvatarImage src={fullDetail.author.avatar} alt="@shadcn" />
                              <AvatarFallback>{fullDetail.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h3 className="name font-bold text-[1.3rem]">{fullDetail.author.name}</h3>
                            <span className="work heading inline-block w-[93%]">{fullDetail.author.heading.length <= 80 ?fullDetail.author.heading:`${fullDetail.author.heading.substring(0,80)}`}</span>
                        </div>
                    </Link>
                    <div className="dot">
                        {!isOwnPost && <button variant="text" style={isFollowed?{background:'#efefef',color:'black',height: '30px',fontWeight:'500',fontSize:'15px'}:{background:'#0195f7',color:'white',height: '30px',fontWeight:'500',fontSize:'15px'}} className="flex items-center rounded-md px-2 py-1"  onClick={()=>handleFollow(localUserId, fullDetail.author._id)}>
                            <h1 className="ml-1">{isFollowed ? 'Unfollow':'Follow'}</h1>
                        </button>}
                    </div>
                </div>
                <h2 className="mt-4 text-[1.4rem] mb-2 ml-1">
                    {showFullTitle ? fullDetail.posttitle : `${fullDetail.posttitle.substring(0, 60)}`}
                    {fullDetail.posttitle.length>50 &&<label className="cursor-pointer ml-2 opacity-60" style={{ fontWeight:'500',fontSize:'18px' }} onClick={handleReadMoreClick}>
                    {showFullTitle ? 'Read Less' : 'Read More...'}
                </label>}
                </h2>
                <div className="imgBg">
                    <img src={fullDetail.postimage} alt="bg" className="cover rounded-md" onDoubleClick={()=>handleLikeButtonClick(fullDetail._id, localUserId)}/>
                </div>                
                <div className="btns">
                    <div className="left">
                        <img src={isLiked?redHeartIcon:heartIcon} alt="heart" className="heart cursor-pointer" onClick={()=>handleLikeButtonClick(fullDetail._id, localUserId)}/>
                        <img src={commentIcon} alt="comment" className="cursor-pointer" onClick={handleCommentClick} />
                    </div>
                </div>

                <h4 className="text-[1.4rem] mt-2">{fullDetail.postlike} likes</h4>
                {fullDetail.postcomment.length > 0 ? <label className="comments text-[1.4rem] cursor-pointer" onClick={()=>setIsShowAllComment(!isShowAllComment)}>{isShowAllComment?'Hide all comments':'View all comments'}</label>:<label className="comments text-[1.4rem]">No comments</label>}
                <div className="addComments relative mb-3 mt-2">
                    <div className="userImg">
                        <img src={fullDetail.author.avatar} alt="user" className="cover scale-75" />
                    </div>
                    <input value={addCommentText} onChange={(event)=>setAddCommentText(event.target.value)} type="text" className="ml-2 pl-3 w-[75%] outline-none text-[1.4rem]" placeholder="Add a comment..." />
                    {addCommentText.length > 0 && <button onClick={()=>handleAddComment(localUserId, fullDetail._id)} className="px-4 py-3 absolute right-0 bg-[#2174c8] rounded-md">{isLoading?<Loader size={23} color={'white'}/>:<FaArrowUpLong color="white" fontWeight={'bolder'}/>}</button>}
                </div>
                   {isShowAllComment && fullDetail.postcomment.length > 0 ?
                    fullDetail.postcomment.map((elm,index)=>{
                        return <div key={index}>
                            <Link to={`/seeuserprofile/${elm.commentId.author._id}`} className="flex cursor-pointer items-center gap-2 ml-10 mt-1">
                                <Avatar className="scale-75 mt-[.2rem]">
                                  <AvatarImage src={elm.commentId.author.avatar} alt="@shadcn" />
                                  <AvatarFallback>{elm.commentId.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <label htmlFor="" className="font-medium cursor-pointer">{elm.commentId.author.name} :</label>
                            </Link>
                            <div className="ml-[5.5rem] mt-[-.8rem]">
                                <label htmlFor="">{elm.commentId.comment}</label>
                            </div>
                        </div> 
                    })
                     
                   :''} 
            </div>
        </div>
    }
    
    </>
    );
}

export default Post;
