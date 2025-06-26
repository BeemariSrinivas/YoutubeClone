import mongoose from "mongoose";

//channel schema
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

//channel model
const Channel = mongoose.model("Channel", channelSchema);

export default Channel;