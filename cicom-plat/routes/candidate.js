var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate.model.js');

router.get('/getCandidates/:candidateId?',function(req,res,next){
  if(req.params.candidateId){
    Candidate.getCandidateById(req.params.candidateId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_CANDIDATE","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_CANDIDATE_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_CANDIDATE_FOUND", "code":1001})
        }
      }
   });
  }else{
    Candidate.getAllCandidates(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_CANDIDATES","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_CANDIDATE_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_CANDIDATE_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createCandidate/',function(req,res,next){
    Candidate.addCandidate(req.body,function(err,count,results){
        if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_CANDIDATE_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_CANDIDATE_SUBMITTED","code":1002}, "result":count});
        }
    });
});

router.put('/updateCandidate/',function(req,res,next){  
  Candidate.updateCandidate(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_CANDIDATE_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_CANDIDATES_FOUND","code":1000},"result":count});
    }
  });
});


module.exports = router;
