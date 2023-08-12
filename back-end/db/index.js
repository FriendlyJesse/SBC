const mysql = require('mysql2')
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require('../config')

const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
})

module.exports = db