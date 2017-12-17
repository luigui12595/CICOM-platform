var express = require('express');
var router = express.Router();
var Subject = require('../models/subject.model.js');

router.get('/getSubjects/:subjectId?',function(req,res,next){
  if(req.params.subjectId){
    Subject.getSubjectById(req.params.subjectId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_SUBJECT","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_SUBJECT_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SUBJECT_FOUND", "code":1001})
        }
      }
   });
  }else{
    Subject.getAllSubjects(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_SUBJECTS","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_SUBJECT_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SUBJECT_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createSubject/',function(req,res,next){
    Subject.addSubject(req.body,function(err,count,results){
        if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_SUBJECT_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_SUBJECT_SUBMITTED","code":1002}, "result":count});
        }
    });
});

router.put('/updateSubject/',function(req,res,next){  
  Subject.updateSubject(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SUBJECT_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBJECTS_FOUND","code":1000},"result":count});
    }
  });
});

router.post('/deleteSubject/',function(req,res,next){  
  Subject.deleteSubject(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SUBJECT_DELETE_ERROR","code":2004},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBJECTS_DELETED","code":1004},"result":count});
    }
  });
});


module.exports = router;
