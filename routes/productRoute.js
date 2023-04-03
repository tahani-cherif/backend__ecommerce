const express=require('express')
const {getproductValidator,
      updateproductValidator,
      deleteproductValidator,
      createproductvaliator
       }=require('../utils/validators/productValidator');


const {getproducts,
       createproduct,
        getproduct,
        updateproduct,
        deleteproduct
    }=require('../services/productService');


const router=express.Router();

router.route('/').get(getproducts)
                 .post(createproductvaliator,createproduct);
router.route('/:id').get(getproductValidator,getproduct)
                    .put(updateproductValidator,updateproduct)
                    .delete(deleteproductValidator,deleteproduct);
module.exports = router;