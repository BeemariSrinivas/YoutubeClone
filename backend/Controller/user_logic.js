import User from "../Model/userModel.js";
import bcrypt from "bcrypt";



//function to register a new user
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


//function to login existing user
export async function checkUserExits(emailUsername, password) {
    try{
        const existingUser = await User.findOne({
            $or: [
                {email:emailUsername},
                {username:emailUsername}
            ]
        });
        if(!existingUser){
            throw new Error("User not Registered.........Please register");
        }
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
        throw new Error(error.message);
    }
}

//function to retreive a user information
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