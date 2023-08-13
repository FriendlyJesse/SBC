import mysql from 'mysql2'
import CONFIG from '../config'

const db = mysql.createPool({
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_DATABASE
})

export default db