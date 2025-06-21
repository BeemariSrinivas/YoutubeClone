import { createchannel } from "../Controller/channel_logic.js";
import { checkUserExits, createUser } from "../Controller/user_logic.js";
import jwt from "jsonwebtoken";


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
            if(user){
                const payload = {userID:user._id,username:user.username};
                const accessToken = jwt.sign(payload,"secretKey",{expiresIn:"1hr"});
                return res.status(200).json({user:user._id, token:accessToken, avatar:user.avatar});
            }
        }
        catch(error){
            return res.status(400).json({error:error.message});
        }
    });

    app.post("/user/createchannel",async(req,res)=>{
        const {name, description, bannner} = req.body;
        try{
            const channel = await createchannel(name, description, bannner);
            if(channel){
                return res.status(201).json({channel:channel._id});
            }
        }
        catch(error){
            return res.status(404).json({error:error.message});
        }
    });
}


export default routes;