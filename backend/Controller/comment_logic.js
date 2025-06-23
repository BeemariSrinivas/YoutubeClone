import mongoose from "mongoose";
import Comment from "../Model/commentModel.js";

export async function newComment(text, user, username, video) {
    const likes = ((Math.random()*100).toFixed(2))*10;
    const dislikes = ((Math.random()).toFixed(2));
    try{
        const comment = await Comment.create({
            text : text,
            user : user,
            username : username,
            video : video,
            likes : likes,
            dislikes : dislikes
        });
        if(comment){
            return comment;
        }
        else{
            throw new Error("Failed to add comment");
        }
    }
    catch(error){
        throw new Error("Failed to add comment");
    }
}

export async function comments(id) {
    try{
        const comments = Comment.find({video:id});
        if(comments)
        {
            return comments;
        }
    }
    catch(error){
        throw new Error("Failed to load comment");
    }
}

export async function deleteComment(id) {
    try{
        const comment = Comment.findByIdAndDelete(id);
        if(comment){
            return comment;
        }
    }
    catch(error){
        throw new Error("Failed to delete comment");
    }
}

export async function editComment(text,id) {
    try{
        const comment = Comment.findByIdAndUpdate(id,{text:text});
        if(comment){
            return comment;
        }
    }
    catch(error){
        throw new Error("Failed to edit comment");
    }
}