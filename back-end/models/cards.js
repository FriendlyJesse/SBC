const db = require('../db')

exports.add = async (req, res) => {
  const { word } = req.body
  const { username, id } = req.auth
  const params = {
    word,
    author: username,
    author_id: id
  }
  // 查重
  const selSql = 'SELECT * FROM cards WHERE is_deleted=0 && word=? '
  const [ rows ] = await db.promise().query(selSql, word)
  console.log(rows)
  if (rows.length >= 1) {
    return res.msg('单词被占用，请换一个吧~', 400)
  }
  // 创建卡片
  const sql = 'INSERT INTO cards SET ?'
  const [ result ] = await db.promise().query(sql, params)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}

exports.getList = async (req, res) => {
  const sql = 'SELECT * FROM cards WHERE is_deleted=0'
  const [ rows ] = await db.promise().query(sql)
  res.msg('获取成功！', 200, rows)
}

exports.del = async (req, res) => {
  const { id } = req.body
  const sql = 'UPDATE cards SET is_deleted=1 WHERE id=?'
  const [ result ] = await db.promise().query(sql, id)
  if (result.affectedRows !== 1) return res.msg('删除出错！', 400)
  res.msg('删除成功！')
}

exports.update = async (req, res) => {
  const { id, word } = req.body
  const { username, id: userid } = req.auth
  // 排除当前的id，查重
  const selSql = 'SELECT * FROM cards WHERE is_deleted=0 && id!=? && word=? '
  const [ rows ] = await db.promise().query(selSql, [id, word])
  if (rows.length >= 1) {
    return res.msg('单词被占用，请换一个吧~', 400)
  }
  // 更新数据
  const sql = 'UPDATE cards SET word=?,author=?,author_id=? WHERE id=?'
  const [ result ] = await db.promise().query(sql, [word, username, userid, id])
  if (result.affectedRows !== 1) return res.msg('修改失败！', 400)
  res.msg('修改成功！')
}