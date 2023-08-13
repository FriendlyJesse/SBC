import axios, { AxiosResponse, AxiosError } from 'axios'
import { host } from './config'

const headers = {
  Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcnkiLCJpZCI6NCwiaXNBZG1pbiI6MCwiaWF0IjoxNjkxOTAzNDg0LCJleHAiOjE2OTE5Mzk0ODR9.Rhc4eFlhvk0FrILhFbZtvef6Eea_lFcRHeOgJx3UKtw'
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