// Import sequelize
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

// Determine if testing, dev, or production environment
// let user, password, host;
// if(process.env.NODE_ENV === "development") {
//   user = process.env.DB_USER;
//   password = process.env.DB_PASS;
//   host = process.env.DB_HOST;
//   port = 9906;
// } else if (process.env.NODE_ENV === "testing") {
//   user = process.env.DB_TEST_USER;
//   password = process.env.DB_TEST_PASS;
//   host = process.env.DB_TEST_HOST;
//   port = 3306;
// }

user = 'root';
password = '';
host = 'localhost';
port = 3306;

// Create the sequelize connection
function tryConnect(attempts) {
  try {
    const sequelize = new Sequelize('roots', user, password, {
      dialect: 'mysql',
      host: host,
      logging: false,
    });

    return sequelize;
  } catch (error) {
    tryConnect(attempts - 1); //fix
  }
}

const sequelize = tryConnect(5);

// export the module
module.exports = sequelize;