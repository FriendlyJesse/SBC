import db from './index'

test('数据库连接是否成功？', (done) => {
  db.query('SELECT 1', (err, results) => {
    expect(results).toEqual([{ 1: 1 }])
    done()
    db.end()
  })
})