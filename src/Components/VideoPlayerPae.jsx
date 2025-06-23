import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { UserContext } from "./UserContex.jsx";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

function VideoPlayerPage(){
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [video, setVideo] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {userID} = useContext(UserContext);
    const [user, setUser] = useState("");
    const [deleteID, setDeleteID] = useState("");
    const [editCommentId, setEditCommentId] = useState("");
    const [edittedComment, setEdittedComment] = useState("");
    const [likes, setlikes] = useState(0);
    const [dislikes, setdislikes] = useState(0);

    //fetching video data
    useEffect(()=>{
        async function fetchVideo() {
            try{
                const res = await axios.get(`http://localhost:3300/video/${id}`);
                setVideo(res.data);
            }
            catch(error){
                alert("Failed to Load Video!!!......Redirecting to Home");
                navigate("/");
            }
        }
        fetchVideo();
    },[id, likes, dislikes]);

    //fetching comments
    useEffect(()=>{
        async function fetchComments() {
            try{
                const res = await axios.get(`http://localhost:3300/comments/${id}`);
                setComments(res.data);
            }
            catch(error){
                alert("Failed to Load Comments!!!......Showing page without comments");
            }
        }
        fetchComments();
    },[id,newComment,deleteID,editCommentId]);

    //fetching user name
    useEffect(()=>{
        async function fetchUser() {
            try{
                const res = await axios.get(`http://localhost:3300/user/${userID}`);
                setUser(res.data);
            }
            catch(error){
                alert("Failed to fetch User!!!");
            }
        }
        fetchUser();
    },[id,newComment]);

    function handleNewComment(event){
        const {value} = event.target;
        setNewComment(value);
    }

    async function handleEditComment(comment) {
        setEditCommentId(comment._id);
        setEdittedComment(comment.text);
    }

    async function handleDeleteComment(comment) {
        const id = comment._id;
        setDeleteID(id);
        try{
            const res = await axios.delete(`http://localhost:3300/channel/${id}`);
            if(res.data){
                alert("Comment Deleted Successfully");
            }
        }
        catch(error){
            alert(error.response?.data?.error||"Failed to DeleteComment");
        }
    }

    function handleEdittedCommenttext(event){
        const {value} = event.target;
        setEdittedComment(value);
    }

    async function handleSaveComment(comment) {
        const id = comment._id;
        try{
            const res = await axios.patch(`http://localhost:3300/comment/${id}`,{
                text : edittedComment
            });
            if(res.data){
                setEdittedComment("");
                setEditCommentId("");
                alert("Comment Edited Successfully");
            }
        }
        catch(error){
            alert(error.response?.data?.error||"Failed to Edit Comment")
        }
    }

    async function handleLikes(){
        if(likes===0){
            try{
                const res = await axios.patch(`http://localhost:3300/likes/${id}`);
                if(res.data){
                    setlikes(1);
                    setVideo(res.data);
                    alert("You have liked the video");
                }
            }
            catch(error){
                alert(error.response?.data?.error||"Failed to Like Video");
            }
        }
        else{
         alert("You have already liked the video");
         return   
        }
    }

    async function handleDisLikes(){
        if(dislikes===0){
            try{
                const res = await axios.patch(`http://localhost:3300/dislikes/${id}`);
                if(res.data){
                    setdislikes(1);
                    setVideo(res.data);
                    alert("You have disliked the video");
                }
            }
            catch(error){
                alert(error.response?.data?.error||"Failed to Dislike Video");
            }
        }
        else{
         alert("You have already disliked the video");
         return
        }
    }

    function handelCancel(){
        setEditCommentId("");
    }

    async function handleUploadComment(){
        if(newComment===""){
            alert("comment can't be empty");
        }
        else{
            try{
                const res = await axios.post("http://localhost:3300/add/comment",{
                    text : newComment,
                    user : userID,
                    username : user.username,
                    video : id
                });
                if(res.data){
                    setNewComment("");
                    alert("Comment added succesfully");
                }
            }
            catch(error){
                setNewComment("");
                alert(error.response?.data?.error||"Failed to Add Comment");
            }
        }
    }

    return(
        <div id="videoPlayer">
            {
                video?
                <div id="videoPlayerArea">
                    <div id="videoinfo">
                        <div>
                            <ReactPlayer
                                url={video.videoUrl}
                                controls
                                width="100%"
                                height="auto"
                                playing={false}
                            />
                            <h2>{video.title}</h2>
                            <div id="videoMetaData">
                                <div id="videoChannelInfo">
                                    {console.log(video.channel)}
                                    <img src={video.channel.banner} alt={video.channel.name} height="60px" width="60px"/>
                                    <div id="channelNameandSubscribers">
                                        <h4>@{video.channel.name}</h4>
                                        <p>{video.channel.subscribers} Subscribers</p>
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                                <div id="videoChnagableData">
                                    <button onClick={handleLikes}  id="likes">{Math.floor(video.likes)} <BiSolidLike size={22}/></button>
                                    <button onClick={handleDisLikes}  id="dislikes">{video.dislikes} <BiSolidDislike size={22}/></button>
                                    <button id="share">Share</button>
                                    <button id="download">Download</button>
                                </div>
                            </div>
                            <p>{video.description}</p>
                            <div></div>
                        </div>
                        <div>
                            <h3>{comments?comments.length:""} Comments</h3>
                            <div id="newComment">
                                <input onChange={handleNewComment} value={newComment} type="text" placeholder="Add a new comment"/>
                                <button onClick={handleUploadComment}>Submit</button>
                            </div>
                            <div id="comments">
                                {
                                    comments?
                                        comments.map((comment)=>{
                                            return(
                                                <div className="comments" key={comment._id}>
                                                    {(editCommentId===comment._id)?
                                                    <div id="editComment">
                                                        <input onChange={handleEdittedCommenttext} value={edittedComment} type="text" />
                                                        <button onClick={()=>handleSaveComment(comment)} >Save</button>
                                                        <button onClick={handelCancel}>Cancel</button>
                                                    </div>
                                                    :<p>{comment.text}</p>}
                                                    <p>@{comment.username}</p>
                                                    <div>
                                                        <p>Likes : {Math.floor(comment.likes)}</p>
                                                        <p>Dislikes: {comment.dislikes.toFixed(1)*10}</p>
                                                    </div>
                                                    {
                                                        comment.user === userID ? 
                                                        <div id="commentButtons">
                                                            <button onClick={()=>handleEditComment(comment)}>Edit</button>
                                                            <button onClick={()=>handleDeleteComment(comment)}>Delete</button>
                                                        </div>
                                                        :<div></div>
                                                    }
                                                </div>
                                            )
                                        })
                                    :<div>Loadings Comments</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div>Playlist</div>
                </div>:
                <div>Loading</div>
            }
        </div>
    )
}


export default VideoPlayerPage;