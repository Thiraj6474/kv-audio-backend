import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    }

})

const Review = mongoose.model("Review",reviewSchema);

export default Review;