var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');

var Log={

    getAllLogs:function(callback){
        return db.query("SELECT * FROM log",callback);
    },
    
    getLogById:function(logId, userId, callback){
        return db.query("SELECT * FROM log WHERE log_id=? AND user_id=?",[logId,userId],callback);
    },

    addLog:function(Log,callback){
        return db.query("INSERT INTO log VALUES(?,?,?,?,?,?)",[0,Log.userId, Log.elementId, Log.token, Log.actionId, Log.timemark],callback);
    },

    deleteLog:function(userId,logId,callback){
        return db.query("DELETE FROM log WHERE userId=? AND log_id=?",[userId, logId],callback);
    }

};
module.exports=Log;