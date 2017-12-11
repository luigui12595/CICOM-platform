var db=require('../dbconnection'); //reference of dbconnection.js

var Action={

    getAllActions:function(callback){
        return db.query("SELECT * FROM action",callback);
    },
    
    getActionsById:function(actionId, callback){
        return db.query("SELECT * FROM action WHERE action_id=?",[actionId],callback);
    }

};
module.exports=Action;