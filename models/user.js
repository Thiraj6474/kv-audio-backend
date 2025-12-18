import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    type : {
        type :String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    }
        
});

const User = mongoose.model("User",userSchema);

export default User;