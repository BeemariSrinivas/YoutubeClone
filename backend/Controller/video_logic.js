import mongoose from "mongoose";
import Video from "../Model/videoModel.js";



//function to upload a new video
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


//function to find all videos belonging to a particular channel and return them
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


//function to find a video information and return it
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

//function to like a video
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



//function to dislike a video
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


//function to edit video information
export async function editVideoData(id,updates) {
    try{
        const updatedVideo = await Video.findByIdAndUpdate(id,{$set:updates},{new:true});
        if(updatedVideo){
            return updatedVideo;
        }
        else{
            throw new Error("Failed to Update Video Data");
        }
    }
    catch(error){
        throw new Error("Failed to Update Video Data");
    }
}


//function to delete a video
export async function deleteVideo(id) {
    try{
        const deletedVideo = await Video.findByIdAndDelete(id);
        if(deletedVideo){
            return deletedVideo;
        }
        else{
            throw new Error("Failed to Delete Video");
        }
    }
    catch(error){
        throw new Error("Failed to Delete Video");
    }
}


//function to get all videos and return them
export async function allVideos() {
    try{
        const videos = await Video.find({});
        if(videos){
            return videos;
        }
        else{
            throw new Error("Failed to Load Videos");   
        }
    }
    catch(error){
        throw new Error("Failed to Load Videos");
    }
}