

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    host: '', 
    username:'', 
    password: '',
    dialect: 'mariadb',
    database:'',
    connectionLimit: 5
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/users")(sequelize, Sequelize);

module.exports = db;