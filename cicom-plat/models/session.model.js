var db=require('../dbconnection'); //reference of dbconnection.js

var Session={

    getAllSessions:function(callback){
        return db.query("SELECT * FROM session_control",callback);
    },
    
    getSessionById:function(sessionToken, userId, callback){
        return db.query("SELECT * FROM session_control WHERE session_token=? AND user_id=?",[sessionToken,userId],callback);
    },

    addSession:function(Session,callback){
        var d = new Date();
        var v = new Date();
        v.setMinutes(d.getMinutes()+30);
        return db.query("INSERT INTO session_control VALUES(?,?,?,?)",[Session.userId, d, Session.token, v],callback);
    },

    updateSession:function(Session,callback){
        var d = new Date();
        var v = new Date();
        v.setMinutes(d.getMinutes()+30);
        return db.query("UPDATE session_control SET session_finish = ? WHERE user_id=? AND session_token=?",[v, Session.userId, Session.sessionToken],callback);
    }

};
module.exports=Session;