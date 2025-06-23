import { createchannel, findChannel } from "../Controller/channel_logic.js";
import { checkUserExits, createUser, fetchUser } from "../Controller/user_logic.js";
import jwt from "jsonwebtoken";
import { checkChannel } from "../Controller/channel_logic.js";
import { channelVideos, dislike, fetchVideo, like, videoUpload } from "../Controller/video_logic.js";
import { comments, deleteComment, editComment, newComment } from "../Controller/comment_logic.js";

function routes(app){

    app.post("/user/register",async (req,res)=>{
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

    app.post("/user/login",async (req,res)=>{
        const {useremail, userpassword} = req.body;
        try{
            const user = await checkUserExits(useremail,userpassword);
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

    app.post("/user/channel",async(req,res)=>{
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

    app.get("/channel/:id",async(req,res)=>{
        const id = req.params.id;
        try{
            const channel = await findChannel(id);
            if(channel){
                return res.status(201).json(channel);
            }
            else{
                return res.status(400).json({error:"Channel Doesn't Exist"});
            }
        }
        catch(error){
            return res.status(404).json({error:error.message});
        }
    });

    app.post("/video/upload",async(req,res)=>{
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

    app.post("/add/comment", async(req,res)=>{
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

    app.get("/comments/:id",async(req,res)=>{
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

    app.delete("/channel/:id",async(req,res)=>{
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

    app.patch("/comment/:id", async(req,res)=>{
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

    app.patch("/likes/:id",async(req,res)=>{
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

    app.patch("/dislikes/:id",async(req,res)=>{
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
}


export default routes;