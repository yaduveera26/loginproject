const mongoose = require('mongoose');

let userschema = mongoose.Schema({
  email : {
    type : String,
    required : true
  },

  username : {
    type : String,
    required : true
  },

  password : {
    type : String,
    required :true
  },

  date : {
    type : Date,
    default : Date.now
  }
}) ;

const user = module.exports = mongoose.model('user',userschema);
