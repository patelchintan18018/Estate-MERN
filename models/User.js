const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    photoURL :{
        type:String,
        default : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
    },
}, {timestamps : true});


const User = mongoose.model("user", UserSchema);
module.exports = User;

