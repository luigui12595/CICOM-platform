var db=require('../dbconnection'); //reference of dbconnection.js

var Subject={

    getAllSubjects:function(callback){
        return db.query("SELECT * FROM subject",callback);
    },
    
    getSubjectById:function(subjectId, callback){
        return db.query("SELECT * FROM subject WHERE subject_id=? ",[subjectId],callback);
    },

    addSubject:function(Subject, callback){
        return db.query("INSERT INTO subject VALUES(?,?)",[0, Subject.name],callback);
    },

    updateSubject:function(Subject,callback){
        return db.query("UPDATE subject SET name = ? WHERE subject_id=?",[Subject.name, Subject.subjectId],callback);
    },

    deleteSubject:function(Subject,callback){
        return db.query("DELETE FROM subject WHERE subject_id=?",[Subject.subject_id],callback);
    }

};
module.exports=Subject;