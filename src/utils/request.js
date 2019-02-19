import axios from 'axios'
import * as utils from './utils'

const baseURL = process.env.VUE_APP_BASE_API

let instance = axios.create({
  baseURL: baseURL,
  timeout: 35000
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const SessionToken = sessionStorage.getItem('token')
    // const cookieToken = utils.getCookie('token')
    const token = SessionToken // ? SessionToken : cookieToken

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    //
    // 在发送请求之前做些什么
    return config
  }, error => {
    return Promise.reject(error)
  })

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  }, error => {
    return Promise.reject(error)
  }
)

function hanldeReq (type, url, data, parms) {
  data = data || {}
  parms = parms || {}
  return new Promise((resolve, reject) => {
    instance
      .request({
        url: url,
        method: type,
        data: data,
        params: parms
      })
      .then(resp => {
        return resolve(resp.data)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

let get = (url, parms) => {
  return hanldeReq('get', url, {}, parms)
}

let post = (url, parms) => {
  return hanldeReq('post', url, parms)
}
let del = (url, params) => {
  return hanldeReq('delete', url, {}, params)
}

let put = (url, params) => {
  return hanldeReq('put', url, params)
}

let pat = (url, params) => {
  return hanldeReq('patch', url, params)
}

export {
  instance,
  get,
  post,
  del,
  pat,
  put,
  hanldeReq
}
