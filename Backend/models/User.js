const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{type:String, require:true},
    fullname:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    phone:{type:String, require:true},
    address:{type:String, require:true},
    gender:{type:String, require:true},
    staffID:{type:String, require:true,unique:true},
    password:{type:String, required:true},
    role:{type:String, default:"user"},
    isActive:{type:Boolean, default:true},
    img:{type:String},
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);
