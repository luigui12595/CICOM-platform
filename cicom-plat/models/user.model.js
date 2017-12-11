var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');

var User={

    getAllUsers:function(callback){
        return db.query("SELECT * FROM user",callback);
    },

    getUserByEmail:function(email,callback){
        return db.query("SELECT * FROM user WHERE email=?",[email],callback);
    },
    
    getUserById:function(userId,callback){
        return db.query("SELECT * FROM user WHERE user_id=?",[userId],callback);
    },

    addUser:function(User,callback){
        return db.query("INSERT INTO user VALUES(?,?,?,?,?,NOW(),NOW(),1)",[User.userId,User.fname,User.lname,User.email, md5(User.password)],callback);
    },

    deleteUser:function(userId,callback){
        return db.query("DELETE FROM user WHERE userId=?",[userId],callback);
    },

    updateUser:function(User,callback){
        return db.query("UPDATE user SET fname=?, lname=?, email=?, password=?, modif_date=NOW(), status=? WHERE userId=?",[User.fname,User.lname,User.email, md5(User.password), User.modifDate, User.status, User.userId],callback);
    }

};
module.exports=User;