import mongoose from "mongoose";

//video schema
const videoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    thumbnailUrl : {
        type : String,
        required : true,
    },
    videoUrl : {
        type : String,
        required : true,
    },
    category :{
        type : String,
        required : true,
    },
    views : {
        type : Number,
        required : true,
    },
    likes : {
        type : Number,
        required : true,
    },
    dislikes : {
        type : Number,
        required : true,
    },
    channel : {
        type : Object,
        required : true,
    }
});

//video model
const Video = mongoose.model("Video", videoSchema);

export default Video;