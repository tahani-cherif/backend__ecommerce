const mongoose = require('mongoose');

const brandShema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true,'brand must be unique'],
        minlength:[2,"to short brand name"],
        maxlength:[32,"to long brand name"],
    },
    slug:{
        type:String,
        lowercase:true,
    }
},{timestamps:true});

module.exports = mongoose.model("brand",brandShema);