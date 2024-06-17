import { Button } from "../ui/button"
import './Post.css'
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
import { FaRegImage } from "react-icons/fa6";
import { useState } from "react"
import Toastify, { ErrorToastify } from '../Toastify/Toastify';
import Loader from "../Loader/Loader"

const CreatePost = (props) => {
  const [postImage, setPostImage] = useState(null);
  const [postText, setPostText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedSuccessful, setUploadedSuccessful] = useState(false);
  const [uploadingFailed, setUploadingFailed] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const triggerFileInput = () => {
    document.getElementById('postfileInput').click();
  }
  const handlePostImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const falseToastify = () => {
    setEmptyError(false);
    setImageError(false);
    setUploadedSuccessful(false);
    setUploadingFailed(false);
  }

  const submitHandler = async(postText, postImage, localUserId) => {
    if(postText.length > 0){
      if(postImage){
        const data = new FormData();
        data.append("file",postImage);
        data.append("upload_preset","post_images");
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
            const rawResult = await fetch(`${backend_url}post/uploadpost/${localUserId}`,{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({postText,secure_url})
            }) 
            const result = await rawResult.json();
            if(result.status===true){
              props.getUserData();
              setUploadedSuccessful(true);
            }else{
              setUploadingFailed(true);
            }
            setIsLoading(false);
          }
        }catch(error){
          setUploadingFailed(true);
          setIsLoading(false);
        }
      }else{
        setImageError(true);
      }
    }else{
      setEmptyError(true);
    }
  }
  return (
    <Dialog className="dialog">
      <DialogTrigger asChild>
        <label htmlFor="" className="cursor-pointer">{props.title}</label>
      </DialogTrigger>
      {emptyError && <ErrorToastify deActivate={falseToastify} time={3000} msg={'Please write something about post!'}/>}
        {imageError &&  <ErrorToastify deActivate={falseToastify} time={3000} msg={'Please select the image!'}/>}  
        {uploadedSuccessful &&  <Toastify deActivate={falseToastify} time={3000} msg={'Your post is successfull uploaded!'}/>}  
        {uploadingFailed &&  <ErrorToastify deActivate={falseToastify} time={3000} msg={'Post uploading Failed!'}/>}  
      <DialogContent className="dialog_content sm:max-w-[425] pb-0">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <img className="rounded-full h-12" src={props.profileImage} alt="" />
            <div className="flex-col">
              <div>
                <label htmlFor="">{props.name}</label>
              </div>
              <label htmlFor="" className="text-sm opacity-60 mt-2">Public</label>
            </div>
          </DialogTitle>
          <DialogDescription className="py-3 overflow-y-auto h-[15rem] ">
          <div className="textarea-container">
              <textarea 
                type="text" 
                placeholder="What do you want to talk about?" 
                className="hidden-textarea w-full resize-none outline-none border-none" 
                value={postText}
                onChange={(event)=>setPostText(event.target.value)}
              />
              <div className="visible-div">{postText}</div>
            </div>
            {/* <textarea type="text" placeholder="What do you want to talk about?" className="px-2 resize-none text-wrap h-full w-full outline-none " /> */}
            <img src={postImage} className="rounded-md" alt="" />
            <input 
                type="file" 
                id="postfileInput" 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handlePostImageChange}
              />
          </DialogDescription>
        </DialogHeader>
        <div className="ml-2 mt-2">
          <label onClick={triggerFileInput}><FaRegImage cursor={'pointer'} fontSize={'1.3rem'} className=" text-gray-500"/></label>
        </div>
        <div className="mt-2">
          <hr />
        </div>
        <DialogFooter className="p-2">
          <Button className="bg-mainColor hover:bg-[#2174c8]" onClick={()=>submitHandler(postText,postImage,props.localUserId)} type="submit">{isLoading?<Loader color={'white'}/>:'Post'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default CreatePost;