import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useState, useRef } from "react";
import "./Post.css";

function Post() {
    const title = "Captain America: Civil War Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, voluptate, dolore ad earum deleniti omnis sint ipsa eaque natus consequatur quae cumque, suscipit delectus culpa quia dicta odit molestiae! Incidunt vel esse optio aliquam, architecto voluptatem cupiditate, totam dolorem quas tenetur velit. Cupiditate illum beatae quo esse, eligendi sit soluta ratione sed eveniet id facilis ipsa, cum dicta! Illo aspernatur nisi laboriosam ullam itaque natus tempore cum quidem corporis laborum. Neque ipsa ex eaque debitis, nihil ad illo assumenda explicabo quidem! Ducimus, ad quae dolorum dolore tempora ab natus quos autem nulla ut quibusdam, sint suscipit. Architecto beatae itaque assumenda";

    const [showFullTitle, setShowFullTitle] = useState(false);
    const [showFoliowing,setShowFoliowing]=useState(true);
    const [likesCount, setLikesCount] = useState(5489);
    const [heartSrc, setHeartSrc] = useState("heart.png");

    const textRef = useRef(null); // Create a ref for the text input

    const handleFollow=()=>{
        setShowFoliowing(!showFoliowing);
    }

    const handleReadMoreClick = () => {
        setShowFullTitle(!showFullTitle);
    };

    const handleLikeButtonClick = () => {
        if (heartSrc === "heart.png") {
            setHeartSrc("heart_red.png");
            setLikesCount(likesCount + 1);
        } else {
            setHeartSrc("heart.png");
            setLikesCount(likesCount - 1);
        }
    };

    const handleCommentClick = () => {
        // Focus on the text input when comment icon is clicked
        if (textRef.current) {
            textRef.current.focus();
        }
    };

    return (
        <div className="postbody">
            <div className="post">
                <div className="top">
                    <div className="userDetails">
                        <div className="profileImg">
                            <img src="User.jpg" alt="user" className="cover" />
                        </div>
                        <h3>Nikhil Kumar<br /><span className="work">Web Designer</span></h3>
                    </div>
                    <div className="dot">
                        <Button variant="text" style={{ height: '45px',fontWeight:'500',fontSize:'20px' }} startIcon={<PersonAddIcon style={{ fontSize: '30px' }} />} onClick={handleFollow}>
                            <h1>{showFoliowing ? 'Follow':'followed'}</h1>
                        </Button>
                    </div>
                </div>
                <h2 className="message">
                    {showFullTitle ? title : `${title.substring(0, 60)}`}<Button variant="text" style={{ fontWeight:'500',fontSize:'18px' }} onClick={handleReadMoreClick}>
                    {showFullTitle ? 'Read Less' : 'Read More...'}
                </Button>
                </h2>
                <div className="imgBg">
                    <img src="Bg.jpg" alt="bg" className="cover" onDoubleClick={handleLikeButtonClick}/>
                </div>                
                <div className="btns">
                    <div className="left">
                        <img src={heartSrc} alt="heart" className="heart" onClick={handleLikeButtonClick}/>
                        <img src="comment.png" alt="comment" onClick={handleCommentClick} />
                    </div>
                    <div className="right">
                        <img src="bookmark.png" alt="bookmark" />
                    </div>
                </div>

                <h4 className="likes">{likesCount} likes</h4>
                <h4 className="comments">View all 546 comments</h4>
                <div className="addComments">
                    <div className="userImg">
                        <img src="User.jpg" alt="user" className="cover" />
                    </div>
                    <input ref={textRef} type="text" className="text" placeholder="Add a comment..." />
                </div>
                <h5 className="postTime ">5 hours ago</h5>
            </div>
        </div>
    );
}

export default Post;
