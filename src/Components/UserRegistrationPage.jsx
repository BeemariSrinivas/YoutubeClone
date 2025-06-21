import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegistrationPage(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    function handleSubmit(event){
        event.preventDefault();
    }

    function isStrongPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    function handleName(event){
        const {value} = event.target;
        setName(value);
    }

    function handleEmail(event){
        const {value} = event.target;
        setEmail(value);
    }

    function handlePassword(event){
        const {value} = event.target;
        setPassword(value);
    }

    function handleConfirmPassword(event){
        const {value} = event.target;
        setConfirmPassword(value);
    }

    function handleAvatar(event){
        const {value} = event.target;
        setAvatar(value);
    }

    async function handleRegister(){
        if(name===""){
            alert("User Name Can't be Empty");
            return;
        }
        else if(email===""){
            alert("Email address can't be Empty");
            return;
        }
        else if(password!==confirmPassword){
            console.log("Password not matched");
            return;
        }
        else if (!isStrongPassword(password)){
            alert("Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.");
            return;
        }
        else if(avatar===""){
            alert("Avatar Can't Be Empty");
            return;
        }
        else{
            try{
                const res = await axios.post("http://localhost:3300/user/register", {
                name : name,
                email : email,
                password : password,
                avatar : avatar
            });
                if(res.data){
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setAvatar("");
                    localStorage.clear();
                    localStorage.setItem("userID",res.data.user);
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("avatar",res.data.avatar);
                    alert("User Registration Successful!!!...Redirecting you to Home Page");
                    navigate("/");
                }
            }
            catch(error){
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setAvatar("");
                console.log("Registration Error", error);
                alert(error.response?.data?.error||"Registration failed.......Try again later");
                if(error.response?.data?.error==="User already registered...........Please login in"){
                    alert("Redirecting you to Login Page")
                    navigate("/authentication");
                }
            }
        }
    }

    return(
        <div id="register">
            <h1>Register Here</h1>
            <form id="formRegister" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">UserName : </label>
                    <input onChange={handleName} value={name} id="name" type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email Address :</label>
                    <input onChange={handleEmail} value={email} id="email" type="email" />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input onChange={handlePassword} value={password} id="password" type="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password : </label>
                    <input onChange={handleConfirmPassword} value={confirmPassword} id="confirmPassword" type="password" />
                </div>
                <div>
                    <label htmlFor="avatar">Avatar : </label>
                    <input onChange={handleAvatar} value={avatar} id="avatar" type="text" />
                </div>
                <button onClick={handleRegister}>Submit</button>
            </form>
        </div>
    )
}


export default UserRegistrationPage;