import { Link, useNavigate, useParams } from "react-router-dom";
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
    const {token,userID} = useContext(UserContext);
    const [user, setUser] = useState("");
    const [deleteID, setDeleteID] = useState("");
    const [editCommentId, setEditCommentId] = useState("");
    const [edittedComment, setEdittedComment] = useState("");
    const [likes, setlikes] = useState(0);
    const [dislikes, setdislikes] = useState(0);
    const [allVideos, setAllVideos] = useState([]);
    const [filtered, setFiltered] = useState([]);

    //fecthes all the videos
    useEffect(()=>{
        async function fecthAllVideos(){
            try{
                const res = await axios.get("http://localhost:3300/videos");
                setAllVideos(res.data);
            }
            catch(error){
                alert(error.response?.data?.error||"Failed to Load videos");
            }
        }
        fecthAllVideos();
    },[]);

    //displays the more videos
    useEffect(()=>{
        if(allVideos){
            let filteredVideos;
            const category = video.category;
            filteredVideos = allVideos.filter((video)=>video.category===category);
            filteredVideos = filteredVideos.filter((video)=>video._id!==id);
            const slicedArray = filteredVideos.slice(0,4);
            setFiltered(slicedArray);
        }
    },[video,allVideos]);

    //fetches the current video data
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

    //fetches the video comments
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

    //fetches the current user name
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

    //Reads the new comment
    function handleNewComment(event){
        const {value} = event.target;
        setNewComment(value);
    }

    //Reads the editted comment Id and presets the edit input previous comment text
    async function handleEditComment(comment) {
        setEditCommentId(comment._id);
        setEdittedComment(comment.text);
    }

    //deletes the comment
    async function handleDeleteComment(comment) {
        const id = comment._id;
        setDeleteID(prev => prev === id ? id + "x" : id);
        try{
            const res = await axios.delete(`http://localhost:3300/comment/${id}`,{
                        headers : {Authorization : `Bearer ${token}`}
                    });
            if(res.data){
                alert("Comment Deleted Successfully");
                try{
                    const res = await axios.get(`http://localhost:3300/comments/${id}`);
                    setComments(res.data);
                }
                catch(error){
                    alert("Failed to Load Comments!!!......Showing page without comments");
                }
            }
        }
        catch(error){
            alert(error.response?.data?.error||"Failed to DeleteComment");
        }
    }

    //Reads the editted comment
    function handleEdittedCommenttext(event){
        const {value} = event.target;
        setEdittedComment(value);
    }

    //Saves the editted coment
    async function handleSaveComment(comment) {
        //validates the editted commnent
        if(edittedComment===""){
            alert("Comment can't be empty");
            return;
        }
        const id = comment._id;
        try{
            //after validation, API call to save the editted comment
            const res = await axios.patch(`http://localhost:3300/comment/${id}`,{
                text : edittedComment
            },{
                headers : {Authorization : `Bearer ${token}`}
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

    //Displays the likes and updates the likes
    async function handleLikes(){
        if(likes===0){
            try{
                const res = await axios.patch(`http://localhost:3300/likes/${id}`,{},{
                        headers : {Authorization : `Bearer ${token}`}
                    });
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

    //Displays the dislikes and updated the dislikes
    async function handleDisLikes(){
        if(dislikes===0){
            try{
                const res = await axios.patch(`http://localhost:3300/dislikes/${id}`,{},{
                        headers : {Authorization : `Bearer ${token}`}
                    });
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

    //cancel the edit comment option
    function handelCancel(){
        setEditCommentId("");
    }

    //Uploads the new comment
    async function handleUploadComment(){
        //validated the new comment
        if(newComment===""){
            alert("comment can't be empty");
        }
        else{
            //after validation, API call to add the new comment
            try{
                const res = await axios.post("http://localhost:3300/add/comment",{
                    text : newComment,
                    user : userID,
                    username : user.username,
                    video : id
                },{
                    headers : {Authorization : `Bearer ${token}`}
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

    //displays the video player
    return(
        <div id="videoPlayer">
            {
                video?
                <div id="videoPlayerArea">
                    <div id="videoinfo">
                            <div className="player-wrapper">
                                <ReactPlayer
                                    className="react-player"
                                    url={video.videoUrl}
                                    controls
                                    width="100%"
                                    height="auto"
                                    playing={false}
                                />
                            </div>
                            <h2 id="videoTitle">{video.title}</h2>
                            <div id="videoMetaData">
                                <div id="videoChannelInfo">
                                    <div id="videochannelInfo">
                                        <img src={video.channel.banner} alt={video.channel.name} height="100px" width="100px"/>
                                        <div id="channelNameandSubscribers">
                                            <h4>@{video.channel.name}</h4>
                                            <p>{Math.floor(video.channel.subscribers)} Subscribers</p>
                                        </div>
                                    </div>
                                    <button>Subscribe</button>
                                </div>
                                <div id="videoChnagableData">
                                    <button onClick={handleLikes}  id="likes">{Math.floor(video.likes)} <BiSolidLike size={22}/></button>
                                    <button onClick={handleDisLikes}  id="dislikes">{Math.floor(video.dislikes)} <BiSolidDislike size={22}/></button>
                                    <button id="share">Share</button>
                                    <button id="download">Download</button>
                                </div>
                            </div>
                            <p>{video.description}</p>
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
                                                    {
                                                        comment.user === userID? 
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
                    <div id="playlist">
                        <h3>You Might Also Like</h3>
                        {
                            filtered.map((playlistVideo)=>{
                                return(
                                    <div className="playlistVideos" key={playlistVideo._id}>
                                        <Link to={`/video/${playlistVideo._id}`}>
                                            <img src={playlistVideo.thumbnailUrl} alt={playlistVideo.title} height="100px" width="100px" />
                                            <p><strong>{playlistVideo.title}</strong></p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>:
                <div>Loading Video........</div>
            }
        </div>
    )
}


export default VideoPlayerPage;