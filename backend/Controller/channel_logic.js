import Channel from "../Model/channelModel.js";

export async function createchannel(name, description, banner) {
    const userID = localStorage.getItem("userID")||"";
    const subscribers = ((Math.random()*100).toFixed(2))*100;
    try{
        if(userID!==""){
            const channel = await Channel.findOne({owner:userID});
            if(!channel){
                const newChannel = await Channel.create({
                    name : name,
                    description : description,
                    banner : banner,
                    subscribers : subscribers,
                    owner : userID
                });
                return channel;
            }
            else{
                throw new Error("User has already a channel");
            }
        }
    }
    catch(error){
        throw new Error("Channel not Created, try again later");
    }
}