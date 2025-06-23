import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../index.css";

function ChannelPage(){
    const navigate = useNavigate();
    const [channel,setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const params = useParams();
    const id = params.id;

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
    },[id]);

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

    function handleUploadVideo(){
        navigate("/upload/video");
    }

    function handleEditVideo(id){
        navigate(`/videoedit/${id}`);
    }

    function handleDeleteVideo(id){

    }

    return (
        <div>
            {channel?
            <div id="channel">
                <img id="channelImage" src={channel.banner} alt={channel.banner}/>
                <h1>{channel.name}</h1>
                <p>{Math.floor(channel.subscribers)} subscribers</p>
                <p>{channel.description}</p>
                <button>Subscribe</button>
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
                        :<div></div>}
                </div>
            </div>
            :"Loading channel data"}
        </div>
    )
}


export default ChannelPage;