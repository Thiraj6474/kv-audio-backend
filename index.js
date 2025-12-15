import express from "express"
import bodyParser from "body-parser";
import mongoose, { connect } from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

const app = express()

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header
    ("Authorization");

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, "kv-secret-89!",
            (err,decoded) => {

                if(!err){
                    req.user = decoded;
                }
            }
        );
    }
    next()
});


const mongoUrl = "mongodb+srv://thirajs:123@cluster0.tbhakaz.mongodb.net/?appName=Cluster0"

mongoose.connect(mongoUrl)
let connection = mongoose.connection
connection.once("open" , ()=> {
    console.log("MongoDB connection established successfully.")
})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});