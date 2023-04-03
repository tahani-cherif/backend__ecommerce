const categorymodel=require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const slugify=require('slugify')
const ApiError=require('../utils/apiError')
const factory = require('./handlersFactory')


// @desc    Get all category
// @route   GET api/categories/
// @access  Public
// exports.getCategories=asyncHandler(async(req,res) => {
//     const page=req.query.page*1 || 1;
//     const limit=req.query.limit*1 ||5;
//     const skip=(page-1)*limit;
//     const categories = await categorymodel.find({}).skip(skip).limit(limit);
//     res.status(200).json({results:categories.length,page,data:categories})
//   });
exports.getCategories=factory.getAll(categorymodel)

// @desc    Get specific category by d
// @route   GET api/categories/:id
// @access  Public
// exports.getCategory = asyncHandler(async(req,res,next)=>{
//   const {id}=req.params; 
//   const category = await categorymodel.findById(id);
//   if(!category)
//   {
//   //  res.status(404).json({msg:`category not found for this id ${id}`})
//     return   next(new ApiError(`category not found for this id ${id}`,404)); 
// }
//   res.status(200).json({data: category});
// })
exports.getCategory=factory.getone(categorymodel)

// @desc    Create a new category
// @route   POST api/categories/
// @access  Private
// exports.createCategory=asyncHandler(async(req,res)=>{
//     const body=req.body
//     const category=await categorymodel.create({name:body.name,slug:slugify(body.name)})
//      res.status(201).json({data:category})
   
// });
exports.createCategory=factory.creatredocument(categorymodel)

// @desc    update specified category
// @route   PUT api/categories/:id
// @access  Private
// exports.updatecategory =asyncHandler(async(req,res,next)=>{
//   const {id}=req.params;
//   const {name}=req.body;

//   const category = await categorymodel.findOneAndUpdate(
//     {_id:id},
//     {name,slug:slugify(name)},
//     {new:true})//return apre update
//   if(!category)
//     {
//       return   next(new ApiError(`category not found for this id ${id}`,404)); 
//     }
//   res.status(200).json({data: category});  
// })
exports.updatecategory=factory.updateOne(categorymodel)

// @desc    delete specified category
// @route   DELETE api/categories/:id
// @access  Private
// exports.deleteCategory =asyncHandler(async(req,res,next)=>{
//    const {id}=req.params;
//    const category=await categorymodel.findByIdAndDelete(id);
//    if(!category)
//     {
//       return   next(new ApiError(`category not found for this id ${id}`,404)); 
//     }
//   res.status(204).send();  
// })
exports.deleteCategory=factory.deleteOne(categorymodel);