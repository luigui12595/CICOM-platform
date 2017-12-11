var db=require('../dbconnection'); //reference of dbconnection.js

var Section={

    getAllSections:function(mediaId, callback){
        return db.query("SELECT * FROM section WHERE media_id=?",[mediaId],callback);
    },
    
    getSectionById:function(sectionId, mediaId, callback){
        return db.query("SELECT * FROM section WHERE section_id=? AND media_id=?",[sectionId, mediaId],callback);
    },

    addSection:function(Section, callback){
        return db.query("INSERT INTO section VALUES(?,?,?)",[0, Section.mediaId, Section.name],callback);
    },

    updateSection:function(Section,callback){
        return db.query("UPDATE section SET name = ?, media_id = ? WHERE section_id=?",[Section.name, Section.mediaId, Section.sectionId],callback);
    }

};
module.exports=Section;