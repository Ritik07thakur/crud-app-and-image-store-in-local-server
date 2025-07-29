const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true 
  },
  email:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    default:"https://www.w3schools.com/howto/img_avatar.png"
  }
})

module.exports = mongoose.model("User", userSchema);