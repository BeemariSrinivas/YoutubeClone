import { FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContex.jsx";

function Header(props){
    const navigate = useNavigate();
    const toggleSidebar = props.toggleSidebar;
    const {userID, avatar, channel, clearUser} = useContext(UserContext);

    function handleSignIn(){
        navigate("/authentication");
    }

    function handleSignOut(){
        clearUser();
        alert("You have Signed Out Successfully");
        navigate("/");
    }

    return(
        <div id="header">
            <button id="hamburgerbutton" onClick={toggleSidebar}><GiHamburgerMenu size={20}/></button>
            <div id="logo">
                <FaYoutube size={30}/>
                Youtube
            </div>
            <div id="search">
                <input id="searchedText" type="text" />
                <button id="searchButton">Search</button>
            </div>
            {userID&&avatar?
                <div>
                    <img key={avatar} id="homeAvatar" src={avatar} alt={userID} height="60px" width="60px"/>
                    <button onClick={handleSignOut} id="signIn">Sign Out</button>
                    {channel?<Link to={`/channel/${channel}`}><span>View Channel</span></Link>:<Link to="/createChannel"><span>Create Channel</span></Link>}
                </div>:
                <button onClick={handleSignIn} id="signIn">Sign In</button>}
        </div>
    )
}


export default Header;