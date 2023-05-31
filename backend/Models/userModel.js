const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:30
    },
    name:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ['admin', 'seller','buyer','rider'],
        required: true
    },
    images:{
        type:String,
        required:true
    }
}
,{timestamps:true}
)

module.exports = mongoose.model("User" , UserSchema);