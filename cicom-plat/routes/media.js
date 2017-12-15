var express = require('express');
var router = express.Router();
var Media = require('../models/media.model.js');
fs = require('fs');

router.get('/getMedia/:mediaId?',function(req,res,next){
  if(req.params.mediaId){
    Media.getMediaById(req.params.mediaId,function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ONE_MEDIA","code":2000},"data":err});
      }else{
        if(rows.length>0){
          res.json({"state":{"stateMessage":"SUCCESS_MEDIA_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_MEDIA_FOUND", "code":1001})
        }
      }
   });
  }else{
    Media.getAllMedia(function(err,rows){
      if(err){
        res.json({"state":{"stateMessage":"ERROR_GETTING_ALL_MEDIA","code":2001},"data":err});
      }else{
        if(rows.length > 0){
          res.json({"state":{"stateMessage":"SUCCESS_MEDIA_FOUND","code":1000},"data":rows});
        }else{
          res.json({"stateMessage":"SUCCESS_NO_MEDIA_FOUND", "code":1001});
        }
      }
    });
  }
});

router.post('/createMedia/',function(req,res,next){
    Media.addMedia(req.body,function(err,count,results){
        if(err){
        console.log(err);
        res.json({"state":{"stateMessage":"ERROR_MEDIA_NO_SUBMITTED","code":2002},"data":err});
        }else{
        res.json({"state":{"stateMessage":"SUCCESS_MEDIA_SUBMITTED","code":1002}, "result":count});
        }
    });
});

router.put('/updateMedia/',function(req,res,next){  
  Media.updateMedia(req.body,function(err,count){ 
    if(err){
      res.json({"state":{"stateMessage":"ERROR_MEDIA_UPDATE_ERROR","code":2003},"data":err});
    }else{
      res.json({"state":{"stateMessage":"SUCCESS_MEDIA_UPDATE","code":1000},"result":count});
    }
  });
});

router.get('/news', function (req, res) {
  fs.readFile('/Users/luiscampos/Documents/Investigacion-CICOM/CICOM-platform/cicom-plat/routes/news.json', 'utf8', function (err,data) {
      if (err) {
          return console.log(err);
      }
      console.log(data);
      res.send(data)
  });

})


module.exports = router;
