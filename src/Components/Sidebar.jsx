import { SiYoutubeshorts } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaFire } from "react-icons/fa";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { CiStreamOn } from "react-icons/ci";
import "../App.css";
import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div id="sidebar">
            <Link to="/">
                <div className="sidebarIcons">
                    <AiFillHome size={20}/>
                    Home
                </div>
            </Link>
            <div className="sidebarIcons">
                <SiYoutubeshorts size={20}/>
                Shorts
            </div>
            <div className="sidebarIcons">
                <MdOutlineSubscriptions size={20}/>
                Subscriptions
            </div>
            <div className="sidebarIcons">
                <FaHistory size={20}/>
                History
            </div>
            <div className="sidebarIcons">
                <MdPlaylistPlay size={20}/>
                PlayList
            </div>
            <div className="sidebarIcons">
                <MdOutlineWatchLater size={20}/>
                Watch Later
            </div>
            <div className="sidebarIcons">
                <LiaDownloadSolid size={20}/>
                Download
            </div>
            <div className="sidebarIcons">
                <FaFire size={20}/>
                Trending
            </div>
            <div className="sidebarIcons">
                <HiOutlineMusicalNote size={20}/>
                Music
            </div>
            <div className="sidebarIcons">
                <CiStreamOn size={20}/>
                Live
            </div>
        </div>
    )
}


export default Sidebar;