import { Request, Response } from 'express'
import CONFIG from '../config'
import db from '../db'
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  const { username } = req.body
  // 根据用户名查询用户的信息
  const sql = 'SELECT * FROM users WHERE username=?'
  const [rows]: any = await db.promise().query(sql, [username])
  if (rows.length !== 1) {
    return res.msg('登录失败，没有这个用户！', 400)
  }
  const userinfo = rows[0]
  // 生成 Token
  const token = jwt.sign({ username, id: userinfo.id, isAdmin: userinfo.isAdmin }, CONFIG.SECRET_KEY,{ expiresIn: CONFIG.EXPIRES_IN })
  res.msg('登录成功！', 200, { token })
}

const add = async (req: Request, res: Response) => {
  const { username } = req.body
  const params = {
    username,
    isAdmin: username === 'Tom' || username === 'tom' ? 1 : 0
  }
  // 查看是否有相同的数据
  const querySql = 'select * from users where username=?'
  const [rows]: any = await db.promise().query(querySql, [username])
  if (rows.length === 1) {
    res.msg('添加失败，已有相同的数据！', 400)
    return
  }
  // 添加数据
  const sql = 'INSERT INTO users SET ?'
  const [ result ]: any = await db.promise().query(sql, params)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}

export default {
  login,
  add
}