const mongoose = require("mongoose");
const ClientSchema = mongoose.Schema({
    fullname:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    phone:{type:String, require:true},
    address:{type:String, require:true},
    gender:{type:String, require:true},
    password:{type:String},
    role:{type:String, default:"client"},
    isActive:{type:Boolean, default:true},
    img:{type:String},
},{timestamps:true})

module.exports = mongoose.model("Client", ClientSchema);
