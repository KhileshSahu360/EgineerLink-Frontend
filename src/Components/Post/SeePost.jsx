import React, { useEffect } from "react";
import { useState } from "react";
import { Postcont } from "../Home/Home";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SeePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postLike, setPostLike] = useState(0);
  const [postComment, setPostComment] = useState([]);
  const [author, setAuthor] = useState(null);
  const [isResult, setIsResult] = useState(false);
  const [postIds, setPostIds] = useState(null);
  const [likedBy, setLikedBy] = useState([]);
  const [localUserData, setLocalUserData] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();
  const { localUserId } = useParams();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    setIsResult(false);
    getPost();
  },[])
  const getPost = async() => {
    try{
    const rawResult = await fetch(`${backend_url}post/getpost/${postId}/${localUserId}`);
    const result = await rawResult.json();
    if(!result.error){
      setIsResult(true);
      const { post, user } = result;
      setPostTitle(post.posttitle);
      setPostImage(post.postimage);
      setPostLike(post.postlike);
      setPostComment(post.postcomment);
      setAuthor(post.author);
      setPostIds(post._id);
      setLikedBy(post.likedby);
      setLocalUserData(user);
    }else{
      navigate('/404error');
    }
  }catch{
      navigate('/404error');
    }
  }
  

  return(
    <>
      <div className="flex justify-center">
        {isResult && <Postcont likedby={likedBy} localUserData={localUserData} localUserId={localUserId} _id={postIds} posttitle={postTitle} postimage={postImage} postlike={postLike} postcomment={postComment} author={author}/>}
      </div>
    </>
  )
}
export default SeePost;