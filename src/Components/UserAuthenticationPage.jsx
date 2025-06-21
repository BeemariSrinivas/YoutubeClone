import { useState } from "react";
import "../index.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function UserAuthenticationPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleRegistration(){
        navigate("/register");
    }

    function handleEmail(event){
        const {value} = event.target;
        setEmail(value);
    }

    function handlePassword(event){
        const {value} = event.target;
        setPassword(value);
    }

    async function handleLogin(){
        console.log("In");
        if(email===""){
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
                const res = await axios.post("http://localhost:3300/user/login",{
                    useremail : email,
                    userpassword : password
                });
                if(res.data){
                    setEmail("");
                    setPassword("");
                    alert("Login Successful!!!........Redirecting to Home Page");
                    localStorage.clear();
                    localStorage.setItem("userID",res.data.user);
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("avatar",res.data.avatar);
                    navigate("/");
                }
            }
            catch(error){
                setEmail("");
                setPassword("");
                alert(error.response?.data?.error||"Login Not Succesfull........Please try again later");
            }
        }
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit} id="loginForm">
                <div>
                    <label htmlFor="loginEmail">Email : </label>
                    <input onChange={handleEmail} value={email} id="loginEmail" type="text" />
                </div>
                <div>
                    <label htmlFor="loginPassword">Password : </label>
                    <input onChange={handlePassword} value={password} id="loginPassword" type="text" />
                </div>
                <button onClick={handleLogin}>Login</button>
            </form>
            -----------Not a user----------<br/>
            <button onClick={handleRegistration}>Register Here</button>
        </div>
    )
}


export default UserAuthenticationPage;