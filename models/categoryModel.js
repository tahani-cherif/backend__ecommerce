const mongoose=require('mongoose')

const category=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category required'],
        unique:[true,'category must be ynique'],
        minlength:[3,'too short category name'],
        maxlength:[32,'too long category name']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{timestamps:true})

const categoymodel=mongoose.model('category',category);

module.exports= categoymodel;    