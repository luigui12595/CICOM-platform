var mysql=require('mysql');
//PROD
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
