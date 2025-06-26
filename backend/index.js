import express from "express";
import mongoose from "mongoose";
import routes from "./Routes/routes.js";
import cors from "cors";

import users from "./utils/YoutubeClone.users.js";
import channels from "./utils/YoutubeClone.channels.js";
import videos from "./utils/YoutubeClone.videos.js";
import comments from "./utils/YoutubeClone.comments.js";

import User from "./Model/userModel.js";
import Channel from "./Model/channelModel.js";
import Video from "./Model/videoModel.js";
import Comment from "./Model/commentModel.js";

//creating server
const app = express();

//middleware to parse json request
app.use(express.json());

//middleware to allow frontent and backend to run on different ports parallely
app.use(cors());

//parsed the extended JSON data to MongoDB drivers understandable Raw JSON
function parseExtendedJSON(obj) {
  if (Array.isArray(obj)) {
    return obj.map(parseExtendedJSON);
  } else if (typeof obj === "object" && obj !== null) {
    if ("$oid" in obj) {
      return obj["$oid"];
    } else if ("$date" in obj) {
      return new Date(obj["$date"]);
    } else {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = parseExtendedJSON(obj[key]);
      }
      return newObj;
    }
  }
  return obj;
}

//URI to connect to the MongoDB compass
const MONGO_URI = "mongodb://localhost:27017/YoutubeClone";



//Seed the database
async function seedDatabase() {
    try{
        await mongoose.connect(MONGO_URI);

        await User.deleteMany({});
        await Channel.deleteMany({});
        await Video.deleteMany({});
        await Comment.deleteMany({});

        await User.insertMany(parseExtendedJSON(users));
        await Channel.insertMany(parseExtendedJSON(channels));
        await Video.insertMany(parseExtendedJSON(videos));
        await Comment.insertMany(parseExtendedJSON(comments));

        console.log("Seeding Successful");

    }
    catch(error){
        console.log("Seeding failed",error);
    }
}

//seed database function call
seedDatabase();

//connecting backend with mongoose
const db = mongoose.connection;

//on succeessful database connection consoles the message
db.on("open",()=>{
    console.log("Connection Successful");
});

//on error in database connection consoles the message
db.on("error",()=>{
    console.log("Connection not successful");
});


//call the routes function
routes(app);


//Server starts listening on port 3300
app.listen(3300,()=>{
    console.log("Server is running on port 3300");
});