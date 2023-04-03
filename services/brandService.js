const brand=require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const slugify=require('slugify')
const ApiError=require('../utils/apiError')


// @desc    Get all brands
// @route   GET api/brands/
// @access  Public
exports.getbrands=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;
    const brands = await brand.find({}).skip(skip).limit(limit);
    res.status(200).json({results:brands.length,page,data:brands})
  });

// @desc    Get specific brand by d
// @route   GET api/brands/:id
// @access  Public
exports.getbrand= asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const brands = await brand.findById(id);
  if(!brands)
  {
  //  res.status(404).json({msg:`category not found for this id ${id}`})
    return   next(new ApiError(`category not found for this id ${id}`,404)); 
}
  res.status(200).json({data: brands});
})

// @desc    Create a new brand
// @route   POST api/brands/
// @access  Private
exports.createbrand=asyncHandler(async(req,res)=>{
    const body=req.body
    const brands=await brand.create({name:body.name,slug:slugify(body.name)})
     res.status(201).json({data:brands})
   
});

// @desc    update specified brands
// @route   PUT api/brands/:id
// @access  Private
exports.updatebrand =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const {name}=req.body;

  const brands = await brand.findOneAndUpdate(
    {_id:id},
    {name,slug:slugify(name)},
    {new:true})//return apre update
  if(!brands)
    {
      return   next(new ApiError(`category not found for this id ${id}`,404)); 
    }
  res.status(200).json({data: brands});  
})

// @desc    delete specified brand
// @route   DELETE api/brands/:id
// @access  Private
exports.deletebrand =asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const brands=await brand.findByIdAndDelete(id);
   if(!brands)
    {
      return   next(new ApiError(`category not found for this id ${id}`,404)); 
    }
  res.status(204).send();  
})