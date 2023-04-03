const subcategorymodel=require('../models/subcategoryModel')
const asyncHandler = require('express-async-handler')
const slugify=require('slugify')
const ApiError=require('../utils/apiError')



exports.setCategoryidtobody=(req,res,next) => {
    if(!req.body.category) req.body.category=req.params.categoryid
    next()
}
// @desc    Create a new subcategory
// @route   POST api/subcategories/
// @access  Private
exports.createSubCategory=asyncHandler(async(req,res)=>{
 
    const {name,category}=req.body
    const subcategory=await subcategorymodel.create({name,slug:slugify(name),category})
     res.status(201).json({data:subcategory})
   
});


exports.createFilterObj=(req,res,next) => {
    let filterObject={}
    //nested route
    if(req.params.categoryid)  filterObject={category:req.params.categoryid}
    req.filterObject=filterObject
    next()

}
// @desc    Get all subcategory
// @route   GET api/subcategories/
// @access  Public
exports.getsubCategories=asyncHandler(async(req,res) => {
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 ||5;
    const skip=(page-1)*limit;

    const subcategories = await subcategorymodel.find(req.filterObject).skip(skip).limit(limit)
    //.populate({path:'category',select:"name -_id"});
    res.status(200).json({results:subcategories.length,page,data:subcategories})
  });

// @desc    Get specific subcategory by d
// @route   GET api/subcategories/:id
// @access  Public
exports.getsubCategory = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const subcategory = await subcategorymodel.findById(id)
  //.populate({path:'category',select:"name -_id"});
  if(!subcategory)
  {
  //  res.status(404).json({msg:`category not found for this id ${id}`})
    return   next(new ApiError(`category not found for this id ${id}`,404)); 
}
  res.status(200).json({data: subcategory});
})

// @desc    update specified subcategory
// @route   PUT api/subcategories/:id
// @access  Private
exports.updatesubcategory =asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {name,category}=req.body;
  
    const subcategory = await subcategorymodel.findOneAndUpdate(
      {_id:id},
      {name,slug:slugify(name),category},
      {new:true})//return apre update
    if(!subcategory)
      {
        return   next(new ApiError(`category not found for this id ${id}`,404)); 
      }
    res.status(200).json({data: subcategory});  
  })
  
// @desc    delete specified subcategory
// @route   DELETE api/subcategories/:id
// @access  Private
exports.deletesubCategory =asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const subcategory=await subcategorymodel.findByIdAndDelete(id);
    if(!subcategory)
     {
        return   next(new ApiError(`category not found for this id ${id}`,404)); 
     }
    res.status(204).send();  
  });

