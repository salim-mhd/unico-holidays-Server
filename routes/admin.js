var express = require('express');
var router = express.Router();
const User = require("../modal/userschema") 

const { postadminlogin , } = require('../Controller/admincontroller/admincontroller') 

router.post('/login',postadminlogin)

router.get('/usersDetails',async(req, res, next)=>{
  const userDetails = await User.find({}) 
  res.status(200).json({ res:userDetails })
});

module.exports = router;
