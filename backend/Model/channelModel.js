import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    banner : {
        type : String,
        required : true,
    },
    subscribers : {
        type : Number,
        required : true,
    },
    owner : {
        type : String,
        required : true,
    }
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;