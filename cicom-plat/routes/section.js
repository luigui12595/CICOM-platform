var express = require('express');
var router = express.Router();
var Section = require('../models/section.model.js');

router.get('/getSection/:mediaId/:sectionId?',function(req,res,next){
  if(req.params.sectionId){
    Section.getSectionById(req.params.sectionId,req.params.mediaId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_SECTION","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_SECTION_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SECTION_FOUND", "code":1001})
        }
      }
   });
  }else{
    Section.getAllSections(req.params.mediaId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_SECTION","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_SECTION_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SECTION_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createSection/',function(req,res,next){
    Section.addSection(req.body,function(err,count,results){
        if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_SECTION_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_SECTION_SUBMITTED","code":1002}, "result":count});
        }
    });
});

router.put('/updateSection/',function(req,res,next){  
  Section.updateSection(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SECTION_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SECTION_UPDATE","code":1000},"result":count});
    }
  });
});


module.exports = router;
