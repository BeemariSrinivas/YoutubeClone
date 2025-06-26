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
    const {userID, avatar, channel, clearUser, searched, setSearched} = useContext(UserContext);

    //Takes the user to sign In page when clicked on Sign In button
    function handleSignIn(){
        navigate("/authentication");
    }

    //Logs out user when clicked on Sign Out
    function handleSignOut(){
        clearUser();
        alert("You have Signed Out Successfully");
        navigate("/");
    }

    //Reads the searched word and globally set the search word using the UserContext
    function handleSearched(event){
        const {value} = event.target;
        setSearched(value);
    }

    //When clicked on Search button takes the player to home page
    function handleSearch(){
        navigate("/");
    }

    //displys the header
    return(
        <div id="header">
            <div id="main">
                <button id="hamburgerbutton" onClick={toggleSidebar}><GiHamburgerMenu size={20}/></button>
                <div id="logo">
                    <FaYoutube size={30}/>
                    Youtube
            </div>
            </div>
            <div id="search">
                <input onChange={handleSearched} value={searched} id="searchedText" type="text" />
                <button onClick={handleSearch} id="searchButton">Search</button>
            </div>
            {userID&&avatar?
                <div id="homeUser">
                    <img key={avatar} id="homeAvatar" src={avatar} alt={userID} height="60px" width="60px"/>
                    <div id="homechannel">
                        {channel?<Link to={`/channel/${channel}`}><span>View Channel</span></Link>:<Link to="/createChannel"><span>Create Channel</span></Link>}
                        <button onClick={handleSignOut} id="signIn">Sign Out</button>
                    </div>
                </div>:
                <button onClick={handleSignIn} id="signIn">Sign In</button>}
        </div>
    )
}


export default Header;