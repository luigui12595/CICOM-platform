var express = require('express');
var router = express.Router();
var Category = require('../models/category.model.js');

function cloneObject(object){
  var clone = {};
  for(var key in object){
    if(object.hasOwnProperty(key))
      clone[key] = object[key];
  }
  return clone;
};

router.get('/getCategory/:categoryId?',function(req,res,next){
  if(req.params.categoryId){
    Category.getCategoryById(req.params.categoryId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_CATEGORY","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_CATEGORY_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_CATEGORY_FOUND", "code":1001})
        }
      }
   });
  }else{
    Category.getAllCategories(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_CATEGORIES","code":2001},"data":err});
      }else{
        var rowLen = rows.length
        if(rowLen > 0){
          var data = []
          var categoryObj =  { "category_id": rows[0].category_id,
                              "category_name": rows[0].category_name,
                              "sub_categories":[]
                            }
          var catId = rows[0].category_id;
          for(i = 0; i < rowLen; i++){
            if( catId == rows[i].category_id){
              var subCat =  { 
                              "category_id": rows[i].category_id,
                              "sub_category_name": rows[i].sub_category_name,
                              "sub_category_id": rows[i].sub_category_id
                            }
              categoryObj.sub_categories.push(cloneObject(subCat))
            }else{
              data.push(cloneObject(categoryObj))
              catId = rows[i].category_id;
              categoryObj.category_id = rows[i].category_id;
              categoryObj.category_name = rows[i].category_name;
              categoryObj.sub_categories = [];
              if(rows[i].sub_category_id != null){
                var subCat =  { 
                  "category_id": rows[i].category_id,
                  "sub_category_name": rows[i].sub_category_name,
                  "sub_category_id": rows[i].sub_category_id
                }
                categoryObj.sub_categories.push(cloneObject(subCat))
              }
            }
          }
          data.push(cloneObject(categoryObj))
          res.json({"state":{"stateMessage":"SUCCESS_CATEGORIES_FOUND","code":1000},"data":data});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_CATEGORIES_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createCategory/',function(req,res,next){
    Category.addCategory(req.body,function(err,count,results){
          if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_CATEGORY_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_CATEGORY_SUBMITTED","code":1002}, "result":count});
        }
    });
});

router.post('/createSubcategory/',function(req,res,next){
  Category.addSubCategory(req.body,function(err,count,results){
      if(err){
      console.log(err);
      res.json({"state":{"stateMessage":"ERROR_SUBCATEGORY_NO_SUBMITTED","code":2002},"data":err});
      }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBCATEGORY_SUBMITTED","code":1002}, "result":count});
      }
  });
});

router.put('/updateCategory/',function(req,res,next){  
  Category.updateCategory(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_CATEGORY_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_CATEGORIES_FOUND","code":1000},"result":count});
    }
  });
});

router.put('/updateSubcategory/',function(req,res,next){  
  Category.updateSubCategory(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SUBCATEGORY_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBCATEGORIES_FOUND","code":1000},"result":count});
    }
  });
});


router.post('/deleteCategory/',function(req,res,next){  
  Category.deleteCategory(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_CATEGORY_DELETE_ERROR","code":2004},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_CATEGORIES_DELETED","code":1004},"result":count});
    }
  });
});

router.post('/deleteSubCategory/',function(req,res,next){  
  Category.deleteSubCategory(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SUBCATEGORY_DELETE_ERROR","code":2004},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBCATEGORIES_DELETED","code":1004},"result":count});
    }
  });
});


module.exports = router;
