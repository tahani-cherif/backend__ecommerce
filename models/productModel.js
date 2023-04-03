const mongoose = require('mongoose');

const productShema=new mongoose.Schema({
    title:{
        type:String,
        required:[true ,'title must be required'],
        trim:true,
        minlength:[3,"too short product title"],
        maxlength:[100,"too long product title"]
    },
    slug:{
        type:String,
        required:[true ,'slug must be required'],
        lowercase:true,
    },
    description:{
        type:String,
        required:[true ,'description must be required'],
        minlength:[20,'too short description']
    },
    quantity:{
        type:Number,
        required:[true ,'quantity must be required'],
    },
    sold:{
        type:Number,
         default:0
    },
    price:{
        type:Number,
        required:[true ,'price must be required'],
        trim:true,
        max:[200000,'too long product price']
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'product image cover is required']
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        require:[true,'product must be belong to category']
    },
    subcategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'subcategory',
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'brand'
    },
    ratingsAverage:{
        type:Number,
        min:[1,"rating must be above or equal 1"],
        max:[5,'rating must be ble or equal 5']
    },
    ratingsQuatntity:{
        type:Number,
        default:0
    }
},
    {timestamps:true});

// Mongoose query middleware
productShema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select: 'name -_id',
    });
    next();
  });

module.exports =mongoose.model("product",productShema)