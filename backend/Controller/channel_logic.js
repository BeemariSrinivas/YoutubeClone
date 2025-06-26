import Channel from "../Model/channelModel.js";


//function to create a new channel
export async function createchannel(name, description, banner, userID) {
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
                return newChannel;
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

//function to find channel and return channel information
export async function checkChannel(id){
    try{
        const channel = await Channel.findOne({owner:id});
        if(channel){
            return channel;
        }
        else{
            return false;
        }
    }
    catch(error){
        throw new Error(error.message);
    }
}

//function to find channel and return channel information
export async function findChannel(id) {
    try{
        const channel = await Channel.findById(id);
        if(channel){
            return channel;
        }
        else{
            return false;
        }
    }
    catch(error){
        throw new Error(error.message);
    }
}