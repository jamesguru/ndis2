const mongoose = require("mongoose");
const ClientSchema = mongoose.Schema({
    fullname:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    phone:{type:String, require:true},
    address:{type:String, require:true},
    gender:{type:String, require:true},
    DOB:{type:String, require:true},
    ndisNo:{type:String, require:true},
    startdate:{type:String, require:true},
    enddate:{type:String, require:true},
    desc:{type:String, require:true},
    password:{type:String},
    role:{type:String, default:"client"},
    isActive:{type:Boolean, default:true},
    img:{type:String},
    documents:{type: Array},
},{timestamps:true})

module.exports = mongoose.model("Client", ClientSchema);
