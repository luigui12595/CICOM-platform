var db=require('../dbconnection'); //reference of dbconnection.js

var Candidate={

    getAllCandidates:function(callback){
        return db.query("SELECT * FROM candidate",callback);
    },
    
    getCandidateById:function(candidateId, callback){
        return db.query("SELECT * FROM candidate WHERE candidate_id=? ",[candidateId],callback);
    },

    addCandidate:function(Candidate, callback){
        return db.query("INSERT INTO candidate VALUES(?,?)",[0, Candidate.name],callback);
    },

    updateCandidate:function(Candidate,callback){
        return db.query("UPDATE candidate SET name = ? WHERE candidate_id=?",[Candidate.name, Candidate.candidateId],callback);
    },

    deleteCandidate:function(Candidate,callback){
        return db.query("DELETE FROM candidate WHERE candidate_id=?",[Candidate.candidateId],callback);
    }

};
module.exports=Candidate;