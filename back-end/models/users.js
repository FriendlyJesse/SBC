const { SECRET_KEY, EXPIRES_IN } = require('../config')
const db = require('../db')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { username } = req.body
  // 根据用户名查询用户的信息
  const sql = 'SELECT * FROM users WHERE username=?'
  const [rows] = await db.promise().query(sql, [username])
  if (rows.length !== 1) {
    return res.msg('登录失败，没有这个用户！', 400)
  }
  const userinfo = rows[0]
  // 生成 Token
  const token = jwt.sign({ username, id: userinfo.id }, SECRET_KEY,{ expiresIn: EXPIRES_IN })
  res.msg('登录成功！', 200, { token })
}

exports.add = async (req, res) => {
  const { username } = req.body
  const params = {
    username,
    isAdmin: username === 'Tom' || username === 'tom' ? 1 : 0
  }
  // 查看是否有相同的数据
  const querySql = 'select * from users where username=?'
  const [rows] = await db.promise().query(querySql, [username])
  if (rows.length === 1) {
    res.msg('添加失败，已有相同的数据！', 400)
    return
  }
  // 添加数据
  const sql = 'INSERT INTO users SET ?'
  const [ result ] = await db.promise().query(sql, params)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}