import db from '../db'
import { Request, Response } from 'express'

const add = async (req: Request, res: Response) => {
  const { word } = req.body
  const { username, id, isAdmin } = req.auth
  if (!isAdmin) {
    return res.msg('只有管理员能够创建卡片！', 400)
  }
  const params = {
    word,
    author: username,
    author_id: id
  }
  // 查重
  const selSql = 'SELECT * FROM cards WHERE is_deleted=0 && word=? '
  const [ rows ]: any = await db.promise().query(selSql, word)
  console.log(rows)
  if (rows.length >= 1) {
    return res.msg('单词被占用，请换一个吧~', 400)
  }
  // 创建卡片
  const sql = 'INSERT INTO cards SET ?'
  const [ result ]: any = await db.promise().query(sql, params)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}

const getList = async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM cards WHERE is_deleted=0'
  const [ rows ] = await db.promise().query(sql)
  res.msg('获取成功！', 200, rows)
}

const del = async (req: Request, res: Response) => {
  const { isAdmin } = req.auth
  if (!isAdmin) {
    return res.msg('只有管理员能够创建卡片！', 400)
  }
  const { id } = req.body
  const sql = 'UPDATE cards SET is_deleted=1 WHERE id=?'
  const [ result ]: any = await db.promise().query(sql, id)
  if (result.affectedRows !== 1) return res.msg('删除出错！', 400)
  res.msg('删除成功！')
}

const update = async (req: Request, res: Response) => {
  const { isAdmin } = req.auth
  if (!isAdmin) {
    return res.msg('只有管理员能够创建卡片！', 400)
  }
  const { id, word } = req.body
  const { username, id: userid } = req.auth
  // 排除当前的id，查重
  const selSql = 'SELECT * FROM cards WHERE is_deleted=0 && id!=? && word=? '
  const [ rows ]: any = await db.promise().query(selSql, [id, word])
  if (rows.length >= 1) {
    return res.msg('单词被占用，请换一个吧~', 400)
  }
  // 更新数据
  const sql = 'UPDATE cards SET word=?,author=?,author_id=? WHERE id=?'
  const [ result ]: any = await db.promise().query(sql, [word, username, userid, id])
  if (result.affectedRows !== 1) return res.msg('修改失败！', 400)
  res.msg('修改成功！')
}

export default {
  add,
  getList,
  del,
  update
}