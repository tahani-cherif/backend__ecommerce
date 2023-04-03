const mongoose = require('mongoose');

const subCtegoryShema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true,'subCtegory must be unique'],
        minlength:[2,"to short subCategory name"],
        maxlength:[32,"to long subCategory name"],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'subCategory must be belong to parent category'],
    }
},{timestamps:true});

module.exports = mongoose.model("subcategory",subCtegoryShema);