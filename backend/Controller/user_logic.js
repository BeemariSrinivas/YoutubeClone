import User from "../Model/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(name, email, password, avatar){
    const existingUser = User.findOne({email:email});
    const hashedPassword = await bcrypt.hash(password,10);
    try{
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
    const existingUser = await User.findOne({email:email});
    if(existingUser){
        if(await bcrypt.compare(password,existingUser.password)){
            return existingUser;
        }
        else{
            throw new Error("Incorrect Email or Password");
        }
    }
    else{
        throw new Error("User not Registered.........Please register");
    }
}