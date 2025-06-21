import express from "express";
import mongoose from "mongoose";
import routes from "./Routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

const MONGO_URI = "mongodb+srv://beemarisrinivas528:Wqvo0mWba3kiQ1UN@cluster0.r9ezgni.mongodb.net/YoutubeClone?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI).then(() => {
    console.log("✅ MongoDB Connected Successfully");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
});

const db = mongoose.connection;

db.on("open",()=>{
    console.log("Connection Successful");
});

db.on("error",()=>{
    console.log("Connection not successful");
});

app.listen(3300,()=>{
    console.log("Server is running on port 3300");
});

routes(app);