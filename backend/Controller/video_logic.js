import mongoose from "mongoose";
import Video from "../Model/videoModel.js";

export async function videoUpload(title, description, thumbnailUrl, videoUrl, category, channel) {
    const views = ((Math.random()*1000).toFixed(2))*100;
    const likes = ((Math.random()*100).toFixed(2))*100;
    const dislikes = ((Math.random()).toFixed(2))*100;
    const video = await Video.findOne({videoUrl:videoUrl});
    if(video){
        throw new Error("Duplicacy of videos not allowed");
    }
    else{
        try{
            const video = await Video.create({
                title : title,
                description : description,
                thumbnailUrl : thumbnailUrl,
                videoUrl : videoUrl,
                category : category,
                views : views,
                likes : likes,
                dislikes : dislikes,
                channel : channel
            });
            if(video){
                return video;
            }
            else{
                throw new Error("Failed to Upload Video");
            }
        }
        catch(error){
            throw new Error("Failed to Upload Video");
        }
    }
}

export async function channelVideos(id) {
    try{
        const videos = await Video.find({"channel._id":id});
        if(videos){
            return videos;
        }
        else{
            throw new Error("Failed to get Videos");
        }
    }
    catch(error){
        throw new Error("Failed to get Videos");
    }
}

export async function fetchVideo(id) {
    try{
        const video = await Video.findById(id);
        if(video){
            return video;
        }
        else{
            throw new Error("Failed to get Videos");
        }
    }
    catch(error){
        throw new Error("Failed to get Videos");
    }
}

export async function like(id){
    try{
        const video = await Video.findByIdAndUpdate(id,{$inc:{likes : 1}},{new:true});
        if(video){
            return video;
        }
        else{
            throw new Error("Failed to Like Video");
        }
    }
    catch(error){
        throw new Error("Failed to Like Video");
    }
}

export async function dislike(id){
    try{
        const video = await Video.findByIdAndUpdate(id,{$inc:{dislikes : 1}},{new:true});
        if(video){
            return video;
        }
        else{
            throw new Error("Failed to Dislike Video");
        }
    }
    catch(error){
        throw new Error("Failed to Dislike Video");
    }
}