import mongoose from "mongoose";


//user schema
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        required : true,
    }
},{
    timestamps : true
});


//user model
const User = mongoose.model("User", userSchema);

export default User;