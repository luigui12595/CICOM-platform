var express = require('express');
var router = express.Router();
var Log = require('../models/log.model.js')

router.get('/getLogs/:logId?/:userId?',function(req,res,next){
  if(req.params.logId && req.params.userId){
    Log.getLogById(req.params.userId,req.params.logId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_LOG","code":2000},"data":err});
      }else{
        res.json({"state":{"stateMessage":"SUCCESS_LOG_FOUND","code":1000},"data":rows});
      }
   });
  }else{
    Log.getAllLogs(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_LOG","code":2000},"data":err});
      }else{
        res.json({"state":{"stateMessage":"SUCCESS_LOG_FOUND","code":1001},"data":rows});
      }
    });
  }
});

/*
router.post('/',function(req,res,next){
  Log.addLog(req.body,function(err,count){
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SUBMITTING_LOG","code":2001},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SUBMITTED_LOG","code":1002},"data":count});
    }
  });
});

router.delete('/:log_id/:user_id',function(req,res,next){
  Log.deleteLog(req.params.user_id,req.params.log_id,function(err,count){
    if(err){
      res.json({"state":{"stateMessage":"ERROR_DELETING_LOG","code":2002},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_DELETING_LOG","code":1003},"data":count});
    }
  });
});
*/

module.exports = router;
