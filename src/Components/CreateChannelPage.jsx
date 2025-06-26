import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContex.jsx";

function CreateChannelPage()
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const {token,userID, updateChannel} = useContext(UserContext);

    //prevents default form subimisson
    function handleSubmit(event){
        event.preventDefault();
    }

    //Reads channel name
    function handleName(event){
        const {value} = event.target;
        setName(value);
    }

    //Reads channel description
    function handleDescription(event){
        const {value} = event.target;
        setDescription(value);
    }

    //Reads Channel Banner Url
    function handleBanner(event){
        const {value} = event.target;
        setBanner(value);
    }

    //Takes all the provided channel information and created a channel name with the given details
    async function handleCreateChannel(){
        //form validation
        if(name===""){
            alert("Channel Name can't be empty");
            return;
        }
        else if(description===""){
            alert("Channel Description can't be empty");
            return;
        }
        else if(banner===""){
            alert("Channel Banner can't be empty");
            return;
        }
        else{   
            //after validation calls API to create a channel
                try{
                    const res = await axios.post("http://localhost:3300/user/channel", 
                        {
                            name : name,
                            description : description,
                            banner : banner,
                            userID : userID
                        },{
                            headers : {Authorization : `Bearer ${token}`}
                        });
                    if(res.data)
                        {
                        setName("");
                        setDescription("");
                        setBanner("");
                        
                        updateChannel(res.data.channel);

                        //on successful channel creation alerts user and navigate the user to created channel page
                        alert("Channel Created Succesfully");
                        navigate(`/channel/${res.data.channel}`);
                    }
            }
            catch(error){
                setName("");
                setDescription("");
                setBanner("");
                alert(error.response?.data?.error||"Unable to create channel, Please try agin later");
            }
        }
    }

    //displays the form to take channel details
    return(
        <div id="createChannelPage">
            <div id="newChannelData">
                <h1 id="createChannelh1">Enter the Channel Details Here</h1>
                <form onSubmit={handleSubmit} id="formCreateChannel">
                    <div>
                        <label htmlFor="">Channel Name : </label>
                        <input onChange={handleName} value={name} type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Description : </label>
                        <input onChange={handleDescription} value={description} type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Channel Banner : </label>
                        <input onChange={handleBanner} value={banner} type="text" />
                    </div>
                </form>
                <button onClick={handleCreateChannel}>Submit</button>
            </div>
        </div>
    )
}

export default CreateChannelPage;