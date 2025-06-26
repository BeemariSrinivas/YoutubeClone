import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContex.jsx";

function UserAuthenticationPage(){
    const [emailUsername, setEmailUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {userID, updateChannel, updateUser} = useContext(UserContext);

    //prevents default form submission
    function handleSubmit(event){
        event.preventDefault();
    }


    //Redirects the user to User Registration page when clicked on Register Here button
    function handleRegistration(){
        navigate("/register");
    }

    //Reads the email or User name of user
    function handleEmailUsername(event){
        const {value} = event.target;
        setEmailUserName(value);
    }

    //Reads the password of user
    function handlePassword(event){
        const {value} = event.target;
        setPassword(value);
    }

    //Logs In the user
    async function handleLogin(){
        //form validation
        if(emailUsername===""){
            alert("Email Can't be empty");
            return;
        }
        else if(password===""){
            alert("Password Can't be empty");
            return;
        }
        else if(password.length<8){
            alert("Password must contain atleast 8 characters");
            return;
        }
        else{
            try{
                //after form validates, API call to log in the user and generate the token
                const res = await axios.post("http://localhost:3300/user/login",{
                    useremailUsername : emailUsername,
                    userpassword : password
                });
                if(res.data){
                    setEmailUserName("");
                    setPassword("");

                    //On successful user login alerts the user and redirects the user to home page
                    alert("Login Successful!!!........Redirecting to Home Page");
                    
                    updateUser({
                        userID : res.data.user,
                        avatar : res.data.avatar,
                        token : res.data.token
                    });

                    updateChannel(res.data.channel);

                    navigate("/");
                }
            }
            catch(error){
                setEmailUserName("");
                setPassword("");
                alert(error.response?.data?.error||"Login Not Succesfull........Please try again later");
            }
        }
    }

    //displays the Login Page
    return (
        <div id="login">
            <div id="loginData">
                <h1>Enter Your Login Details</h1>
                <form onSubmit={handleSubmit} id="loginForm">
                    <div>
                        <label htmlFor="loginEmail">Email or Username : </label>
                        <input onChange={handleEmailUsername} value={emailUsername} id="loginEmail" type="text" />
                    </div>
                    <div>
                        <label htmlFor="loginPassword">Password : </label>
                        <input onChange={handlePassword} value={password} id="loginPassword" type="password" />
                    </div>
                </form>
                <button onClick={handleLogin}>Login</button>
                <h3>-----------Not a user----------</h3>
                <button onClick={handleRegistration}>Register Here</button>
            </div>
        </div>
    )
}


export default UserAuthenticationPage;