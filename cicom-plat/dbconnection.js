var mysql=require('mysql');
//PROD
<<<<<<< HEAD
// var connection=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'jicaros',
//     database:'cicom'
// });
//LOCAL LJ
/*var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'fofirocks',
    database:'cicom'
});
*/
//LOCAL Anita
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'PezKoi2!',
    database:'cicom'
});
module.exports=connection;
=======
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
>>>>>>> 113aca9caf677c487506848e065122d8916a60cf
