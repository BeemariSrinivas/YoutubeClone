import { useContext, useState } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContex";

function VideoEditPage(){
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [category, setCategory] = useState("");
    const {token, channel} = useContext(UserContext);

    //prvernts the default form submission
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

    //Reads the video thumbnail url
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

    //Edits the video information
    async function handleEditVideo() {
        const updates = {};

        //checks for the information given the user
        if(title) {updates.title=title};
        if(description) {updates.description=description};
        if(thumbnailUrl) {updates.thumbnailUrl=thumbnailUrl};
        if(category) {updates.category=category};
        if(videoUrl) {updates.videoUrl=videoUrl};

        //validates form
        if(Object.keys(updates).length===0){
            alert("No changes made");
            return;
        }

        try{
            //if atleast one of the field information provided, then API call to edit the video information
            const res = await axios.patch(`http://localhost:3300/video/editdata/${id}`,updates,{
                        headers : {Authorization : `Bearer ${token}`}
                    });
            if(res.data){
                //upon successful video edit, alerts the user and redirects the user to channel page
                alert("You have editted data successfully!!!......Redirecting you to Channel Page");
                navigate(`/channel/${channel}`);
            }
        }
        catch(error){
            alert(error.response?.data?.error||"Failed to edit video data");
        }
    }

    //displays the video edit form
    return(
        <div id="videoEditPage">
            <div id="videoEditPageData">
                <h1>Enter the details you want to Edit</h1>
                <form onSubmit={handleSubmit} id="videoEditForm">
                    <div className="videoEditPage">
                        <label htmlFor="etext">Title : </label>
                        <input onChange={handleTitle} id="etext" type="text" />
                    </div>
                    <div className="videoEditPage">
                        <label htmlFor="edescription">Description : </label>
                        <input onChange={handleDescription} id="edescription" type="text" />
                    </div>
                    <div className="videoEditPage">
                        <label htmlFor="ethumbnailUrl">Thumbnail Url : </label>
                        <input onChange={handleThumbnailUrl} id="ethumbnailUrl" type="text" />
                    </div>
                    <div className="videoEditPage">
                        <label htmlFor="eVideoUrl">Video Url : </label>
                        <input onChange={handleVideoUrl} id="ethumbnailUrl" type="text" />
                    </div>
                    <div className="videoEditPage">
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
                <button onClick={handleEditVideo}>Submit</button>
            </div>
        </div>
    )
}


export default VideoEditPage;