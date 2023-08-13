import axios, { AxiosResponse, AxiosError } from 'axios'
import { host, token } from './config'

const headers = {
  Authorization: 'Bearer ' + token
}

export const getData = (url: string, params: any, fn: ( response: AxiosResponse ) => void) => {
  return axios.get(`${host}${url}`, { params, headers }).then(response => {
    fn(response)
  })
}

export const postData = (url: string, data: any, fn: ( response: AxiosResponse ) => void, errFn?: ( response: AxiosError ) => void) => {
  return axios.post(`${host}${url}`, data, { headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}

export const delData = (url: string, data: any, fn: ( response: (AxiosResponse) ) => void, errFn?: ( response: AxiosError ) => void) => {
  return axios.delete(`${host}${url}`, { data, headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}

export const updateData = (url: string, data: any, fn: ( response: AxiosResponse ) => void, errFn?: ( response: AxiosError ) => void) => {
  return axios.put(`${host}${url}`, data, { headers }).then(response => {
    fn(response)
  }).catch(response => {
    errFn && errFn(response)
  })
}