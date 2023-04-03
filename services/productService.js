const productmodel=require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify=require('slugify')
const ApiError=require('../utils/apiError')
const ApiFeatures=require('../utils/apiFeautres')
const factory = require('./handlersFactory')


// @desc    Get all product
// @route   GET api/products/
// @access  Public
// exports.getproducts=asyncHandler(async(req,res) => {
    // const quaeryStringObj={...req.query}
    // const  excludesFields=['page','sort','limit','fields']
    // excludesFields.forEach(element => {
    //   delete quaeryStringObj[element]
    // });
    // const page=req.query.page*1 || 1;
    // const limit=req.query.limit*1 ||5;
    // const skip=(page-1)*limit;

    //{price:{$gte:50}} >=50 , 
    // let queryStr=JSON.stringify(quaeryStringObj)
    // queryStr=queryStr.replace(/\b(gte|get|lte|lt)\b/g,match=>`$${match}`);
    // queryStr=JSON.parse(queryStr)
    //price,-solde => price -solde
    // const sortBy=req.query.sort.split(',').join(' ')
    // const fildesBy=req.query.fields.split(',').join(' ')
    //search
    // const query={}
    // query.$or=[{title:{$regex:req.query.keyword,$options:'i'}}]
  //   const count=await productmodel.countDocuments()
  //   const apiFeautures=new ApiFeatures(productmodel.find(),req.query).paginate(count).filter().search('Products').limitFields().sort()
  //  const {mongooseQuery,paginationResult}=apiFeautures
  //   const product=await mongooseQuery
  //   //  const products = await productmodel.find(queryStr).skip(skip).limit(limit).populate({path:'category',select:'name'}).sort(sortBy).select(fildesBy);
  //   // const products = await productmodel.find(query)
  //   res.status(200).json({results:product.length,paginationResult,data:product})
  // });
  exports.getproducts=factory.getAll(productmodel)
// @desc    Get specific product by d
// @route   GET api/products/:id
// @access  Public
exports.getproduct = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const products = await productmodel.findById(id).populate({path:'category',select:'name'});
  if(!products)
  {
    return   next(new ApiError(`product not found for this id ${id}`,404)); 
}
  res.status(200).json({data: products});
})

// @desc    Create a new product
// @route   POST api/products/
// @access  Private
exports.createproduct=asyncHandler(async(req,res)=>{
    req.body.slug=slugify(req.body.title)
    const products=await productmodel.create(req.body)
     res.status(201).json({data:products})
   
});

// @desc    update specified product
// @route   PUT api/products/:id
// @access  Private
exports.updateproduct =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  if(req.body.title)
  {
    req.body.slug=slugify(req.body.title);
  }

  const products = await productmodel.findOneAndUpdate(
    {_id:id},
   req.body,
    {new:true})//return apre update
  if(!products)
    {
      return   next(new ApiError(`product not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: products});  
})

// @desc    delete specified product
// @route   DELETE api/products/:id
// @access  Private
exports.deleteproduct =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const products=await productmodel.findByIdAndDelete(id);
   if(!products)
    {
      return   next(new ApiError(`product not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
})