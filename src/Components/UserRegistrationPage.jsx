import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContex.jsx";

function UserRegistrationPage(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const { updateUser } = useContext(UserContext);

    //prevents the default form submission
    function handleSubmit(event){
        event.preventDefault();
    }

    //Checks the password strength
    function isStrongPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    //Reads the user name
    function handleName(event){
        const {value} = event.target;
        setName(value);
    }


    //Reads the user email
    function handleEmail(event){
        const {value} = event.target;
        setEmail(value);
    }

    //Reads the password
    function handlePassword(event){
        const {value} = event.target;
        setPassword(value);
    }

    //Reads the confirm password
    function handleConfirmPassword(event){
        const {value} = event.target;
        setConfirmPassword(value);
    }

    //Reads the avatar url
    function handleAvatar(event){
        const {value} = event.target;
        setAvatar(value);
    }

    //Registers the new user
    async function handleRegister(){
        //validates the form
        if(name===""){
            alert("User Name Can't be Empty");
            return;
        }
        else if(email===""){
            alert("Email address can't be Empty");
            return;
        }
        else if(password!==confirmPassword){
            alert("Password not matched");
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
            //after form validates, API call to register a new user
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

                    updateUser({
                        userID : res.data.user,
                        avatar : res.data.avatar,
                        token : res.data.token
                    });

                    //upon successful user registration alerts ther user and redirects the user to home page
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

    //displays the registration page
    return(
        <div id="register">
            <div id="registerData">
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
                </form>
                <button onClick={handleRegister}>Submit</button>
            </div>
        </div>
    )
}


export default UserRegistrationPage;