const { check } = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')
const categorymodel=require('../../models/categoryModel.js')
const subcategorymodel=require('../../models/subcategoryModel')

exports.createproductvaliator=[
    check('title').isLength({min:3}).withMessage('must be at least 3 chars')
                  .notEmpty().withMessage('product title required'),
    check('description').notEmpty().withMessage('product description required')
                        .isLength({max:2000}).withMessage('too long description '),
    check('quantity').notEmpty().withMessage('product quantity required')
                     .isNumeric().withMessage('product quantity must be number'),
    check('sold').optional()
                 .isNumeric().withMessage('product sold must be number'),
    check('price').notEmpty().withMessage('product price required')
                  .isNumeric().withMessage('product price must be number')
                  .isLength({max:32}).withMessage('too long price'),
    check('priceAfterDiscount').optional()
                               .isNumeric().withMessage('product priceAfterDiscount must be number')
                               .toFloat()
                               .custom((value,{req})=>{
                                if(req.body.price <=value)
                                {
                                    throw new Error ('priceAfterDiscount must be lower than price')
                                }
                                return true
                               }),
    check('colors').optional()
                   .isArray().withMessage('availableColors should be array of string'),
    check('imageCover').notEmpty().withMessage('Product imageCover is required'),
    check('images').optional()
                    .isArray().withMessage('images should be array of string'),
    check('category').notEmpty().withMessage('Product must be belong to a category')
                     .isMongoId().withMessage('Invalid ID formate')
                     .custom((categoryId) =>
                                 categorymodel.findById(categoryId).then((category) => {
                                   if (!category) {
                                     return Promise.reject(
                                       new Error(`No category for this id: ${categoryId}`)
                                     );
                                   }
                                 })
                               )
                    ,
    check('subcategories').optional()
                          .isMongoId().withMessage('Invalid ID formate')
                          .custom((subcategoriesIds) =>
                               subcategorymodel.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
                                   (result) => {
                                     if (result.length < 1 || result.length !== subcategoriesIds.length) {
                                       return Promise.reject(new Error(`Invalid subcategories Ids`));
                                     }
                                   }
                                 )
                               )
                           .custom((val, { req }) =>
                                     subcategorymodel.find({ category: req.body.category }).then(
                                   (subcategories) => {
                                     const subCategoriesIdsInDB = [];
                                     subcategories.forEach((subCategory) => {
                                       subCategoriesIdsInDB.push(subCategory._id.toString());
                                     });
                                     // check if subcategories ids in db include subcategories in req.body (true)
                                     const checker = (target, arr) => target.every((v) => arr.includes(v));
                                     if (!checker(val, subCategoriesIdsInDB)) {
                                       return Promise.reject(
                                         new Error(`subcategories not belong to category`)
                                       );
                                     }
                                   }
                                 )
                               )
                        ,
                           
    check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
    check('ratingsAverage').optional()
                           .isNumeric().withMessage('ratingsAverage must be a number')
                           .isLength({ min: 1 }).withMessage('Rating must be above or equal 1.0')
                           .isLength({ max: 5 }).withMessage('Rating must be below or equal 5.0'),
    check('ratingsQuantity').optional()
                            .isNumeric().withMessage('ratingsQuantity must be a number'),
                           
                             validatorMiddleware,

];


exports.getproductValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    validatorMiddleware,
];

exports.updateproductValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    validatorMiddleware,
];

exports.deleteproductValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    validatorMiddleware,
];