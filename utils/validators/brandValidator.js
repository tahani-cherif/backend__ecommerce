const { check } = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')

exports.getbrandValidator=[
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware,
];

exports.createbrandValidator=[
    check('name').notEmpty().withMessage('brand required')
                 .isLength({min:3}).withMessage('too short brand name')
                 .isLength({max:32}).withMessage('too long brand name'),
    validatorMiddleware,
];

exports.updatebrandValidator=[
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware,
];

exports.deletebrandValidator=[
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware,
];