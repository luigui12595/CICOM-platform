var mysql=require('mysql');
//PROD
 var connection=mysql.createPool({
     host:'localhost',
     user:'root',
     password:'jicaros',
     database:'cicom'
 });
//LOCAL
//var connection=mysql.createPool({
//    host:'localhost',
//    user:'root',
//    password:'fofirocks',
//    database:'cicom'
//});
module.exports=connection;
