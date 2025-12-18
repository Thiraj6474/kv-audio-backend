import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req,res){
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({message : "User registered successfully"})
    }).catch((error)=>{
        res.status(500).json({error : "User registration failed"})
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
            
            if(user==null){
                res.status(404).json({
                    error : "User not found"
                })
            }else{

                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if (isPasswordCorrect){

                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        type : user.type,
                        profilePicture : user.profilePicture,
                        phoneNumber :user.phoneNumber,


                    },process.env.JWT_SECRET)


                    res.json({message : "Login Successful" , token : token});
                }else{
                    res.status(401).json({ error: "Login failed"});
                }
            }
        }
    )
}

export function isItAdmin(req){
     let isAdmin = false;
    if(req.user != null){
        if(req.user.type == "admin"){
            isAdmin = true;
        }
    }
    return isAdmin;
}

export function isItCustomer(req){
    let isCustomer = false;
    if(req.user != null){
        if(req.user.type == "customer"){
            isCustomer = true;
        }
    }
    return isCustomer;
}



/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG55LmRvZUBleGFtcGxlLmNvbSIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTc2NTY0Nzc2Mn0.w0c2smY9LnecgYIldSep0nYsAvTnkO1GFHWq97-Tye8            -   "email": "johny.doe@example.com",
  "password": "Password@123" - user */