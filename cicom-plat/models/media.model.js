var db=require('../dbconnection'); //reference of dbconnection.js

var Media={

    getAllMedia:function(callback){
        return db.query("SELECT * FROM media",callback);
    },
    
    getMediaById:function(mediaId, callback){
        return db.query("SELECT * FROM media WHERE media_id=? ",[mediaId],callback);
    },

    addMedia:function(Media, callback){
        return db.query("INSERT INTO media VALUES(?,?)",[0, Media.name],callback);
    },

    updateMedia:function(Media,callback){
        return db.query("UPDATE media SET name = ? WHERE media_id=?",[Media.name, Media.mediaId],callback);
    }

};
module.exports=Media;