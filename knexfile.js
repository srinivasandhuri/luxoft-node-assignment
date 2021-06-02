const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'mariadb',
        password : 'mariadb',
        database : 'luxsoft'
      }
  },
  test: {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'mariadb',
        password : 'mariadb',
        database : 'luxsoft'
      }
  }
};