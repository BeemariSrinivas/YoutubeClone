import { createchannel, findChannel } from "../Controller/channel_logic.js";
import { checkUserExits, createUser, fetchUser } from "../Controller/user_logic.js";
import jwt from "jsonwebtoken";
import { checkChannel } from "../Controller/channel_logic.js";
import { allVideos, channelVideos, deleteVideo, dislike, editVideoData, fetchVideo, like, videoUpload } from "../Controller/video_logic.js";
import { comments, deleteComment, editComment, newComment } from "../Controller/comment_logic.js";

function routes(app){

    //route to register a new user
    app.post("/user/register", async (req,res)=>{
        const {name, email, password, avatar} = req.body;
        try{
            const user = await createUser(name, email, password, avatar);
            if(user){
                const payload = {userID:user._id,username:user.username};
                const accessToken = jwt.sign(payload,"secretKey",{expiresIn:"1hr"});
                return res.status(201).json({user:user._id, token:accessToken, avatar:user.avatar});
            }
        }
        catch(error){
            return res.status(500).json({error:error.message});
        }
    });

    //route to login the existing user
    app.post("/user/login", async (req,res)=>{
        const {useremailUsername, userpassword} = req.body;
        try{
            const user = await checkUserExits(useremailUsername,userpassword);
            const channel = await checkChannel(user._id);
            if(!channel&&user){
                const payload = {userID:user._id,username:user.username};
                const accessToken = jwt.sign(payload,"secretKey",{expiresIn:"1hr"});
                return res.status(200).json({user:user._id, token:accessToken, avatar:user.avatar});
            }
            else if(channel&&user){
                const payload = {userID:user._id,username:user.username,channel:channel._id};
                const accessToken = jwt.sign(payload,"secretKey",{expiresIn:"1hr"});
                return res.status(200).json({user:user._id, token:accessToken, avatar:user.avatar, channel:channel._id});
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to create a new channel
    app.post("/user/channel", verifyToken, async(req,res)=>{
        const {name, description, banner, userID} = req.body;
        try{
            const channel = await createchannel(name, description, banner, userID);
            if(channel){
                return res.status(201).json({channel:channel._id});
            }
        }
        catch(error){
            return res.status(404).json({error:error.message});
        }
    });

    //route to get particular channel data through channel id
    app.get("/channel/:id", async(req,res)=>{
        const id = req.params.id;
        try{
            const channel = await findChannel(id);
            if(channel){
                return res.status(200).json(channel);
            }
            else{
                return res.status(400).json({error:"Channel Doesn't Exist"});
            }
        }
        catch(error){
            return res.status(404).json({error:error.message});
        }
    });

    //route to upload a new video
    app.post("/video/upload", verifyToken, async(req,res)=>{
        const {title, description, thumbnailUrl, videoUrl, category, channel} = req.body;
        try{
            const video = await videoUpload(title, description, thumbnailUrl, videoUrl, category, channel);
            if(video){
                return res.status(201).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to get videos belonging to a channel with channel Id
    app.get("/videos/:id", async(req,res)=>{
        const id = req.params.id;
        try{
            const videos = await channelVideos(id);
            if(videos){
                return res.status(200).json(videos);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to get particular video data through the video Id
    app.get("/video/:id", async(req,res)=>{
        const id = req.params.id;
        try{
            const video = await fetchVideo(id);
            if(video)
            {
                return res.status(200).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to add a new comment
    app.post("/add/comment", verifyToken, async(req,res)=>{
        const {text, user, username, video} = req.body;
        try{
            const comment = await newComment(text, user, username, video);
            if(comment){
                return res.status(200).json(comment);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //routes to get all comments of a video through video Id
    app.get("/comments/:id", async(req,res)=>{
        const id = req.params.id;
        try{
            const commentsArray = await comments(id);
            if(commentsArray){
                return res.status(200).json(commentsArray);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to get a particular user information through user Id
    app.get("/user/:id", async(req,res)=>{
        const id = req.params.id;
        try{
            const user = await fetchUser(id);
            if(user){
                return res.status(200).json(user);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to delete a comment
    app.delete("/comment/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        try{
            const comment = await deleteComment(id);
            if(comment){
                return res.status(200).json(comment);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to edit a comment
    app.patch("/comment/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        const {text} = req.body;
        try{
            const comment = await editComment(text,id);
            if(comment){
                return res.status(200).json(comment);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to like a video
    app.patch("/likes/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        try{
            const video = await like(id);
            if(video){
                return res.status(200).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to dislike a video
    app.patch("/dislikes/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        try{
            const video = await dislike(id);
            if(video){
                return res.status(200).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to edit video information
    app.patch("/video/editdata/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        const updates = req.body;
        try{
            const video = await editVideoData(id,updates);
            if(video){
                return res.status(200).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to delete a video
    app.delete("/delete/video/:id", verifyToken, async(req,res)=>{
        const id = req.params.id;
        try{
            const video = await deleteVideo(id);
            if(video){
                return res.status(200).json(video);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    //route to get all the videos
    app.get("/videos",async(req,res)=>{
        try{
            const videos = await allVideos();
            if(videos){
                return res.status(200).json(videos);
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });
}

//middleware function for authorizing user requests
function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error:"Access Denied!!!......No Token Provided!!!....Login Again"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,"secretKey");
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(403).json({error:"Invalid or Expired Token!!!........Please login again"});
    }
}


export default routes;