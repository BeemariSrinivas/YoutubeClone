import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateChannelPage(){
    const navigate = useNavigate("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");

    function handleSubmit(event){
        event.preventDefault();
    }

    function handleName(event){
        const {value} = event.target;
        setName(value);
    }

    function handleDescription(event){
        const {value} = event.target;
        setDescription(value);
    }

    function handleBanner(event){
        const {value} = event.target;
        setBanner(value);
    }

    function handleCreateChannel(){
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
            try{
                const res = axios.post("http://localhost:3300/user/createchannel",{
                    name : name,
                    description : description,
                    banner : banner,
                });
                if(res.data){
                    setName("");
                    setDescription("");
                    setBanner("");
                    localStorage.setItem("channelID",res.data.channel);
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

    return(
        <div id="createChannelPage">
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
                    <label htmlFor="">Channel Banner :</label>
                    <input onChange={handleBanner} value={banner} type="text" />
                </div>
            </form>
            <button onClick={handleCreateChannel}>Submit</button>
        </div>
    )
}

export default CreateChannelPage;