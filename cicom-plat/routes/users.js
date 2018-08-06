var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js')
var SessionControl = require('../models/session.model')
var md5 = require('md5');
router.get('/getUser/:userId?',function(req,res,next){
  if(req.params.userId){
    User.getUserById(req.params.userId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_USER","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_USERS_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_USERS_FOUND", "code":1001})
        }
      }
   });
  }else{
    User.getAllUsers(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_USERS","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_USERS_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_USERS_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createUser/',function(req,res,next){
  User.addUser(req.body,function(err,count){
    if(err){
      console.log(err);
      res.json({"state":{"stateMessage":"ERROR_USER_NO_SUBMITTED","code":2002},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_USER_SUBMITTED","code":1002}, "result":count});
    }
  });
});

router.delete('/deleteUser/:userId',function(req,res,next){
  User.deleteUser(req.params.userId,function(err,count){
    if(err){
      res.json({"state":{"stateMessage":"ERROR_USER_NO_DELETED","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_USER_SUBMITTED","code":1003}, "result":count});
    }
  });
});
router.put('/updateUser/:userId',function(req,res,next){  
  User.updateUser(req.params.userId,req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_USER_NO_DELETED","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_USERS_FOUND","code":1000},"result":count});
    }
  });
});

router.get('/findByEmail/:email',function(req,res,next){
  if(req.params.email){
    User.getUserByEmail(req.params.email,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_USER","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_USERS_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_USERS_FOUND", "code":1001});
        }
      }
   });
  }
});

router.post('/login',function(req,res,next){
  var selectedUser = req.body
  if(selectedUser.email && selectedUser.password){
    User.getUserByEmail(selectedUser.email,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_USER","code":2000},"data":err});
      }else{
        if(rows.length>0){
         var userFound = rows[0];
          if(md5(selectedUser.password) == userFound.password){
            var UserToLogin ={
              userId: userFound.user_id,
              token: md5(userFound.email+new Date()+userFound.password),
            }
            SessionControl.addSession(UserToLogin,function(err,count){
              if(err){
                res.json({"state":{"stateMessage":"ERROR_IN_LOGIN","code":2001},"data":err});
              }else{
                UserToLogin.email = selectedUser.email;
                if(selectedUser.is_admin == 0){
                  userFound.isAdmin = false;
                }else{
                  userFound.isAdmin = true;
                }
                res.json({"state":{"stateMessage":"SUCCESS_LOGIN_USER","code":1000},"user":UserToLogin});
              }
            })
            
          }else{
            res.json({"state":{"stateMessage":"ERROR_WRONG_PASSWORD","code":2002},"data":err});
          }
        }else{
          res.json({"state":{"stateMessage":"ERROR_WITH_CREDENTIALS","code":2003},"data":err});
        }
      }
   });
  }
});

module.exports = router;
