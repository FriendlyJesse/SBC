import { getData, postData, delData, updateData } from '../test/fetchData'

test('添加单词', (done) => {
  postData('/cards', {
    word: 'hello'
  }, (response) => {
    expect(response.status).toBe(200)
    done()
  }, (err) => {
    const data = err.response?.data
    const arr = [{message: '单词被占用，请换一个吧~'}, {message: '只有管理员能够创建卡片！'}]
    expect(arr).toContainEqual(data)
    done()
  })
})

test('查看单词列表', (done) => {
  getData('/cards', {}, (response) => {
    expect(response.status).toBe(200)
    done()
  })
})

test('删除单词', (done) => {
  delData('/cards', { id: 3 }, (response) => {
    expect(response.status).toBe(200)
    done()
  }, (err) => {
    const data = err.response?.data
    const arr = [{message: '只有管理员能够创建卡片！'}]
    expect(arr).toContainEqual(data)
    done()
  })
})

test('更新单词', (done) => {
  updateData('/cards', { id: 7, word: 'blue' }, (response) => {
    expect(response.status).toBe(200)
    done()
  }, (err) => {
    const data = err.response?.data
    const arr = [{message: '只有管理员能够创建卡片！'}]
    expect(arr).toContainEqual(data)
    done()
  })
})