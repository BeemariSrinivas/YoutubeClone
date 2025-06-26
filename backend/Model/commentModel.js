import { text } from "express";
import mongoose from "mongoose";

//comment schema
const commentSchema = mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    user : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    video : {
        type : String,
        required : true
    },
    likes : {
        type : Number,
        required : true
    },
    dislikes : {
        type : Number,
        required : true
    }
});

//comment model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;