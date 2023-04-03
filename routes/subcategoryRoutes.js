const express=require('express')

const {createsubCategoryValidator,
       getsubCategoryValidator,
       updatesubCategoryValidator,
       deletesubCategoryValidator,
     }=require('../utils/validators/subcategoryValidator')
const {createSubCategory,
       getsubCategories,
       getsubCategory,
       updatesubcategory,
       deletesubCategory,
       setCategoryidtobody,
       createFilterObj
    }=require('../services/subcategoryService')


//mergeParams : allow us to access parameter on other routers
const router=express.Router({mergeParams: true});

router.route('/').post(setCategoryidtobody,createsubCategoryValidator,createSubCategory)
                 .get(createFilterObj,getsubCategories);
router.route('/:id').get(getsubCategoryValidator,getsubCategory)
                    .put(updatesubCategoryValidator,updatesubcategory)
                    .delete(deletesubCategoryValidator,deletesubCategory);

module.exports = router;