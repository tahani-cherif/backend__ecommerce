const express=require('express')
const {getCategoryValidator,
      updateCategoryValidator,
      deleteCategoryValidator,
      createCategoryValidator
       }=require('../utils/validators/categoryValidator');


const {getCategories,
       createCategory,
        getCategory,
        updatecategory,
        deleteCategory
    }=require('../services/categoryService');

const subcategories =require('./subcategoryRoutes');

const router=express.Router();
router.use('/:categoryid/subcategories',subcategories);

router.route('/').get(getCategories)
                 .post(createCategoryValidator,createCategory);
router.route('/:id').get(getCategoryValidator,getCategory)
                    .put(updateCategoryValidator,updatecategory)
                    .delete(deleteCategoryValidator,deleteCategory);
module.exports = router;