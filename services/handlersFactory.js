const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const ApiFeatures=require('../utils/apiFeautres')

exports.deleteOne=(model)=>asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const document=await model.findByIdAndDelete(id);
    if(!document)
     {
       return   next(new ApiError(`document not found for this id ${id}`,404)); 
     }
   res.status(204).send();  
 });

 exports.updateOne=(model)=>asyncHandler(async(req,res,next)=>{
  
    const document = await model.findOneAndUpdate(
      {_id:req.params.id},
      req.body,
      {new:true})//return apre update
    if(!document)
      {
        return   next(new ApiError(`document not found for this id ${req.params.id}`,404)); 
      }
    res.status(200).json({data: document});  
  })

exports.creatredocument=(model)=>asyncHandler(async(req,res)=>{
    const document=await model.create(req.body)
     res.status(201).json({data:document})
   
});

exports.getone=(model)=>asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    const document = await model.findById(id);
    if(!document)
    {
    //  res.status(404).json({msg:`category not found for this id ${id}`})
      return   next(new ApiError(`document not found for this id ${id}`,404)); 
  }
  res.status(200).json({data: document});
})
exports.getAll = (model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const count=await model.countDocuments()
    const apiFeautures=new ApiFeatures(model.find(filter),req.query)
    .paginate(count).filter().search().limitFields().sort()

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeautures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });