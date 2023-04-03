const { check ,body} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const { default: slugify } = require('slugify');

exports.getCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    validatorMiddleware,
];

exports.createCategoryValidator=[
    check('name').notEmpty().withMessage('category required')
                 .isLength({min:3}).withMessage('too short category name')
                 .isLength({max:32}).withMessage('too long category name'),
    body('name')
                 // .optional()
                 .custom((val, { req }) => {
                   req.body.slug = slugify(val);
                   return true;
                 }),
    validatorMiddleware,
];

exports.updateCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    body('name')
    // .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    validatorMiddleware,
];

exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid categoru id format'),
    validatorMiddleware,
];