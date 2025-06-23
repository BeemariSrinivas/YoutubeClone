import { useContext, useEffect, useState } from "react";
import "../index.css"
import axios from "axios";
import { UserContext } from "./UserContex.jsx";
import { useNavigate } from "react-router-dom";


function UploadVideoPage(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [category, setCategory] = useState("");
    const {channel} = useContext(UserContext);
    const [channelData, setChannelData] = useState("");

    //fetching channel name
    useEffect(()=>{
        async function fetchChannel() {
            try{
                const res = await axios.get(`http://localhost:3300/channel/${channel}`);
                setChannelData(res.data);
            }
            catch(error){
                alert(error.response?.data?.error||"Failed to Load Channel Info!!!");
            }
        }
        fetchChannel();
    },[]
    );

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleTitle(event){
        const {value} = event.target;
        setTitle(value);
    }

    function handleDescription(event){
        const {value} = event.target;
        setDescription(value);
    }

    function handleThumbnailUrl(event){
        const {value} = event.target;
        setThumbnailUrl(value);
    }

    function handleVideoUrl(event){
        const {value} = event.target;
        setVideoUrl(value);
    }

    function handleCategory(event){
        const {value} = event.target;
        setCategory(value);
    }

    async function handleVideoUpload() {
        console.log(channel);
        if(title===""){
            alert("Title Can't Be Empty");
            return;
        }
        else if(description===""){
            alert("Description Can't Be Emplty");
            return;
        }
        else if(thumbnailUrl===""){
            alert("Thumbnail Url Can't Be Empty");
            return;
        }
        else if(videoUrl===""){
            alert("Video Url Can't Be Empty");
            return;
        }
        else if(category===""){
            alert("Category Can't Be Empty");
            return;
        }
        else{
            try{
                if(!channelData){
                    return;
                }
                const res = await axios.post("http://localhost:3300/video/upload",
                    {
                        title : title,
                        description : description,
                        thumbnailUrl : thumbnailUrl,
                        videoUrl : videoUrl,
                        category : category,
                        channel : channelData
                    }
                );
                if(res.data){
                    setTitle("");
                    setDescription("");
                    setThumbnailUrl("");
                    setVideoUrl("");
                    setCategory("");
                    alert("Video Uploaded Successfully!!!........Redirecting to Your Channel");
                    navigate(`/channel/${channel}`);
                }
            }
            catch(error){
                setTitle("");
                setDescription("");
                setThumbnailUrl("");
                setVideoUrl("");
                setCategory("");
                alert(error.response?.data?.error||"Video Upload Not Successful.........Try again Later...........Redirecting to Channel Page");
                navigate(`/channel/${channel}`);
            }
        }
    }

    return(
        <div id="videoUpload">
            <form onSubmit={handleSubmit} id="formVideoUpload">
                <div className="videoUploadData">
                    <label htmlFor="vtitle">Title : </label>
                    <input onChange={handleTitle} value={title} id="vtitle" type="text" />
                </div>
                <div className="videoUploadData">
                    <label htmlFor="vdescription">Description : </label>
                    <input onChange={handleDescription} value={description} id="vdescription" type="text" />
                </div>
                <div className="videoUploadData">
                    <label htmlFor="vthumbnailUrl">Thumbnail Url : </label>
                    <input onChange={handleThumbnailUrl} value={thumbnailUrl} id="vthumbnailUrl" type="text" />
                </div>
                <div className="videoUploadData">
                    <label htmlFor="videoUrl">Video Url : </label>
                    <input onChange={handleVideoUrl} value={videoUrl} id="videoUrl" type="text" />
                </div>
                <div className="videoUploadData">
                    <label htmlFor="vcategory">Category : </label>
                    <select onChange={handleCategory} id="vcategory" >
                        <option value="">---Choose a Category---</option>
                        <option value="Programming">Programming</option>
                        <option value="Education">Education</option>
                        <option value="Sports">Sports</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>
            </form>
            <button onClick={handleVideoUpload}>Submit</button>
        </div>
    )
}


export default UploadVideoPage;