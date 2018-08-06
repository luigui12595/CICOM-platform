var db=require('../dbconnection'); //reference of dbconnection.js
var md5 = require('md5');

var User={

    getAllUsers:function(callback){
        return db.query("SELECT * FROM user WHERE status = 1",callback);
    },

    getUserByEmail:function(email,callback){
        return db.query("SELECT * FROM user WHERE email=?",[email],callback);
    },
    
    getUserById:function(userId,callback){
        return db.query("SELECT * FROM user WHERE user_id=?",[userId],callback);
    },

    addUser:function(User,callback){
        return db.query("INSERT INTO user VALUES(?,?,?,?,?,NOW(),NOW(),?,?)",[0,User.fname,User.lname,User.email, md5(User.password),User.isAdmin],callback);
    },

    deleteUser:function(userId,callback){
        return db.query("UPDATE user SET status = 0, modif_date = NOW() WHERE userId=?",[userId],callback);
    },

    updateUser:function(User,callback){
        return db.query("UPDATE user SET fname=?, lname=?, email=?, modif_date=NOW(), status=?, is_admin=? WHERE userId=?",[User.fname,User.lname,User.email, User.modifDate, User.status, User.isAdmin, User.userId],callback);
    }

};
module.exports=User;