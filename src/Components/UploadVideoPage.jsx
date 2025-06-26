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
    const {token, channel} = useContext(UserContext);
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

    //Prevents default form submission
    function handleSubmit(event){
        event.preventDefault();
    }

    //Reads the video title
    function handleTitle(event){
        const {value} = event.target;
        setTitle(value);
    }

    //Reads the video description
    function handleDescription(event){
        const {value} = event.target;
        setDescription(value);
    }

    //Reads the video thumbanil url
    function handleThumbnailUrl(event){
        const {value} = event.target;
        setThumbnailUrl(value);
    }

    //Reads the video url
    function handleVideoUrl(event){
        const {value} = event.target;
        setVideoUrl(value);
    }

    //Reads the category
    function handleCategory(event){
        const {value} = event.target;
        setCategory(value);
    }

    //Uploads the video
    async function handleVideoUpload() {
        //validates the form
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
                //After form validation waits till the channel data is fetched
                if(!channelData){
                    return;
                }
                //API call to upload a video
                const res = await axios.post("http://localhost:3300/video/upload",
                    {
                        title : title,
                        description : description,
                        thumbnailUrl : thumbnailUrl,
                        videoUrl : videoUrl,
                        category : category,
                        channel : channelData
                    },{
                        headers : {Authorization : `Bearer ${token}`}
                    }
                );
                if(res.data){
                    setTitle("");
                    setDescription("");
                    setThumbnailUrl("");
                    setVideoUrl("");
                    setCategory("");

                    //alerts when video uploaded successfully and redirects the user to channel page
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

    //displays the form to get the video details
    return(
        <div id="videoUpload">
            <div id="videoUploadData">
                <h1>Enter Your Video Details</h1>
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
        </div>
    )
}


export default UploadVideoPage;