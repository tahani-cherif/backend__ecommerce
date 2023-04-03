const { check } = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')

exports.getsubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid subcategory id format'),
    validatorMiddleware,
];

exports.createsubCategoryValidator=[
    check('name').isAlpha().withMessage('subcategory must be unique')
                 .notEmpty().withMessage('subcategory required')
                 .isLength({min:3}).withMessage('too short subcategory name')
                 .isLength({max:32}).withMessage('too long subcategory name'),
    check('category').notEmpty().withMessage('category required')
                     .isMongoId().withMessage('Invalid category id '),
    validatorMiddleware,
];

exports.updatesubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid subcategory id format'),
    validatorMiddleware,
];

exports.deletesubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid subcategory id format'),
    validatorMiddleware,
];