const { text } = require('express');
const mongoose= require('mongoose');
var userschema =mongoose.Schema({
 name:String,
 phone:Number,
 email:String,
 password:String,
 createdat:Date,
 block:Boolean
});
var userone =mongoose.model("user",userschema)
module.exports=userone 