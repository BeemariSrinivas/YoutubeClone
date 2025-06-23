import User from "../Model/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(name, email, password, avatar){
    try{
        const existingUser = await User.findOne({email:email});
        const hashedPassword = await bcrypt.hash(password,10);
        if(!existingUser){
            const user = await User.create({
                username : name,
                email : email,
                password : hashedPassword,
                avatar : avatar,
            });
            return user;
        }
        else{
            throw new Error("User already registered...........Please login in");
        }
    }
    catch(error){
        throw new Error(error.message);
    }
}



export async function checkUserExits(email, password) {
    try{
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            if(await bcrypt.compare(password,existingUser.password)){
                return existingUser;
            }
            else{
                throw new Error("Incorrect Email or Password");
            }
        }
    }
    catch(error){
        throw new Error("User not Registered.........Please register");
    }
}

export async function fetchUser(id) {
    try{
        const user = User.findById(id);
        if(user){
            return user;
        }
    }
    catch(error){
        throw new Error("Failed to get User");
    }
}