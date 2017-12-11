var express = require('express');
var router = express.Router();
var Session = require('../models/session.model.js');
var md5 = require('md5');

router.get('/getSession/:sessionToken?/:userId?',function(req,res,next){
  if(req.params.userId && req.params.sessionToken){
    Session.getSessionById(req.params.userId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_SESSION","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_SESSION_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SESSION_FOUND", "code":1001})
        }
      }
   });
  }else{
    Session.getAllSessions(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_SESSIONS","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_SESSION_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_SESSION_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/login/',function(req,res,next){
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
        return rand() + rand(); // to make it longer
    };
    var tokenGenerated = md5(token());
    req.body.token = tokenGenerated;
    Session.addSession(req.body,function(err,count,results){
        if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_SESSION_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_SESSION_SUBMITTED","code":1002}, "result":count, "token":tokenGenerated});
        }
    });
});

router.put('/updateSession/',function(req,res,next){  
  Session.updateSession(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_SESSION_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_SESSION_UPDATE","code":1000},"result":count});
    }
  });
});


module.exports = router;
