import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { UserContext } from "./UserContex.jsx";

function ChannelPage(){
    const navigate = useNavigate();
    const [channel,setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [deleteID, setDeleteID] = useState("");
    const {token} = useContext(UserContext);
    const params = useParams();
    const id = params.id;

    //Fetches the channel Videos
    useEffect(()=>{
        async function fetchVideos() {
            try{
                const res = await axios.get(`http://localhost:3300/videos/${id}`);
                setVideos(res.data);
            }
            catch(error){
                alert(error.response?.data?.error||"Can't get videos");
            }
        }
        fetchVideos();
    },[id,deleteID]);

    //Fetches channel Data
    useEffect(()=>{
        async function fetchChannel(params) {
            try{
                const res = await axios.get(`http://localhost:3300/channel/${id}`);
                setChannel(res.data);
            }
            catch(error){
                alert(error.response?.data?.error||"Can't get channel");
            }
        }
        fetchChannel();
    },[id]);

    //Redirects Vidoeo Upload Page where users can upload video data
    function handleUploadVideo(){
        navigate("/upload/video");
    }

    //Redirects to Edit Video page where users can edit the uploaded vidoe
    function handleEditVideo(id){
        navigate(`/videoedit/${id}`);
    }

    //Deletes the channel video
    async function handleDeleteVideo(id){
        setDeleteID(id);
        try{
            const video = await axios.delete(`http://localhost:3300/delete/video/${id}`,{
                        headers : {Authorization : `Bearer ${token}`}
                    });
            if(video){
                alert("Video Deleted Successfully");
            }
        }
        catch(error){
            alert(error.response?.data?.error||"Failed to Delete Video......Try again Later");
        }
    }

    //Displays the channel page
    return (
        <div>
            {channel?
            <div id="channel">
                <img id="channelImage" src={channel.banner} alt={channel.banner}/>
                <h1>{channel.name}</h1>
                <p>{Math.floor(channel.subscribers)} subscribers</p>
                <p>{channel.description}</p>
                <button onClick={handleUploadVideo}>Upload a Video</button><br/>
                <div id="channeloptions">
                    <span>Home</span>
                    <span>Videos</span>
                    <span>Shorts</span>
                    <span>Live</span>
                    <span>Playlists</span>
                    <span>Community</span>
                </div>
                <hr/>
                <div>
                    {videos.length>0?
                        <div id="channelVideo">
                            <div id="channelVideoData">
                                {
                                    videos.map((video)=>{
                                        return(
                                            <div className="channelVideo" key={video._id}>
                                                <Link to={`/video/${video._id}`}>
                                                        <img src={video.thumbnailUrl} alt={video.thumbnailUrl} height="200px" width="200px"/>
                                                        <p><strong>{video.title}</strong></p>
                                                </Link>
                                                <button onClick={()=>handleEditVideo(video._id)}>Edit</button>
                                                <button onClick={()=>handleDeleteVideo(video._id)}>Delete</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :<div></div>}
                </div>
            </div>
            :"Loading channel data"}
        </div>
    )
}


export default ChannelPage;