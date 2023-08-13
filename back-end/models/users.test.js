const { postData } = require('../test/fetchData')

test('创建用户是否成功？', (done) => {
  postData('/users/add', {
    username: 'test'
  }, (response) => {
    expect(response.statusCode).toBe(200)
    done()
  }, (err) => {
    const data = err.response.data
    expect(data).toEqual({message: '添加失败，已有相同的数据！'})
    done()
  })
})

test('登录是否成功？', (done) => {
  postData('/users/login', {
    username: 'Tom'
  }, (response) => {
    expect(response.status).toBe(200)
    done()
  })
})