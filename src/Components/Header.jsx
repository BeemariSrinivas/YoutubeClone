import { FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header(props){
    const toggleSidebar = props.toggleSidebar;
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID")||"";
    const accessToken = localStorage.getItem("token")||"";
    const avatar = localStorage.getItem("avatar")||"";

    function handleSignIn(){
        navigate("/authentication");
    }

    function handleSignOut(){
        localStorage.clear();
    }

    return(
        <div id="header">
            <button onClick={toggleSidebar}><GiHamburgerMenu size={20}/></button>
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
                    <img id="homeAvatar" src={avatar} alt={userID} height="60px" width="60px"/>
                    <button onClick={handleSignOut} id="signIn">Sign Out</button>
                    <Link to="/createChannel"><span>Create Channel</span></Link>
                </div>:
                <button onClick={handleSignIn} id="signIn">Sign In</button>}
        </div>
    )
}


export default Header;