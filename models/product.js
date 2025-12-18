import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "uncatergorized"
    },
    dimentions : {
        type : String,
        required : true
    },
    description : { 
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    image : {
        type : [String],
        required : true,
        default : ["https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"]
    }
})

const Product =  mongoose.model("Product",productSchema);



export default Product;