const express=require('express')
const {getbrandValidator,
      updatebrandValidator,
      deletebrandValidator,
      createbrandValidator
       }=require('../utils/validators/brandValidator');


const {getbrands,
       createbrand,
        getbrand,
        updatebrand,
        deletebrand
    }=require('../services/brandService');


const router=express.Router();
router.route('/').get(getbrands)
                 .post(createbrandValidator,createbrand);
router.route('/:id').get(getbrandValidator,getbrand)
                    .put(updatebrandValidator,updatebrand)
                    .delete(deletebrandValidator,deletebrand);
module.exports = router;