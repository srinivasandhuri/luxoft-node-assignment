// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: '127.0.0.1', 
//     user:'root', 
//     password: 'mariadb',
//     database:'luxsoft',
//     connectionLimit: 5
// });

// module.exports = {
//     getConnection: function(){
//         return new Promise(function(resolve,reject){
//           pool.getConnection().then(function(connection){
//             resolve(connection);
//           }).catch(function(error){
//             reject(error);
//           });
//         });
//       }
//     } 

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    host: '127.0.0.1', 
    username:'root', 
    password: 'mariadb',
    dialect: 'mariadb',
    database:'luxsoft',
    connectionLimit: 5
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/users")(sequelize, Sequelize);

module.exports = db;