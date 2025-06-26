import { useContext, useEffect, useState } from "react";
import "../index.css";
import { UserContext } from "./UserContex.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage(){
    const {userID, searched, setSearched} = useContext(UserContext);
    const [allVideos, setAllVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Programming", "Education", "Sports", "Entertainment"];

    //Fetches all the videos
    useEffect(()=>{
        async function fecthAllVideos(){
            try{
                const res = await axios.get("http://localhost:3300/videos");
                setAllVideos(res.data);
                setVideos(res.data);
            }
            catch(error){
                alert(error.response?.data?.error||"Failed to Load videos");
            }
        }
        fecthAllVideos();
    },[]);


    //applies filter and search functionality
    useEffect(()=>{
        let filtered = allVideos;
        if(selectedCategory!=="All"){
            filtered =allVideos.filter(video=>video.category===selectedCategory);
        }
        const search = searched.trim().toLowerCase();
        if(searched.trim()!==""){
            filtered = filtered.filter(
                (video)=>video.title.toLowerCase().includes(search)
                    ||video.channel.name.toLowerCase().includes(search)
                );
        }
        setVideos(filtered)
    },[selectedCategory, searched, allVideos]);

    //displays home page
    return(
            <div id="home">
                {
                    userID?
                    <div id="homeCatgeory">
                        {
                            categories.map((category)=>{
                                return(
                                    <div key={category}
                                    className={`homeCategory ${selectedCategory ===category?"active":""}`}
                                    onClick={()=>setSelectedCategory(category)}>
                                        {category}
                                    </div>
                                )
                            })
                        }
                    </div>:
                    <div></div>
                }
                {
                    (userID||searched!=="")?
                    <div id="homepage">
                        {
                            videos?
                                videos.map((video)=>{
                                    return(
                                        <Link to={`/video/${video._id}`} key={video._id}>
                                            <div className="video">
                                                <img src={video.thumbnailUrl} alt={video.title} height="300px" width="300px" />
                                                <p><strong>{video.title}</strong></p>
                                                <p>@{video.channel.name}</p>
                                                <p>{Math.floor(video.views)} views</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            :<div>Loading Videos</div>
                        }
                    </div>
                    :<div className="NoVideo">Search for a video</div>
                }
                {
                    userID&&videos.length===0&&searched!==""&&<div className="NoVideo">No Video found</div>
                }
                {
                    userID&&videos.length===0&&searched===""&&<div className="NoVideo">Loading Videos........</div>
                }
            </div>
    )
}


export default HomePage;