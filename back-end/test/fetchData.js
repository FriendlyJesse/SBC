const axios = require('axios')
const { host } = require('./config')

const headers = {
  Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcnkiLCJpZCI6NCwiaXNBZG1pbiI6MCwiaWF0IjoxNjkxOTAzNDg0LCJleHAiOjE2OTE5Mzk0ODR9.Rhc4eFlhvk0FrILhFbZtvef6Eea_lFcRHeOgJx3UKtw'
}

exports.getData = (url, params, fn) => {
  return axios.get(`${host}${url}`, { params, headers }).then(response => {
    fn(response)
  })
}

exports.postData = (url, data, fn, errFn) => {
  return axios.post(`${host}${url}`, data, { headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}

exports.delData = (url, data, fn, errFn) => {
  return axios.delete(`${host}${url}`, { data, headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}

exports.updateData = (url, data, fn, errFn) => {
  return axios.put(`${host}${url}`, data, { headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}