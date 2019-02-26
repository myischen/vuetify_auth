import {
  get,
  post
} from '@/utils/request'

const prefix = '/sso'

export const singup = async (params) => {
  return post(prefix + '/users', params)
}

export const singin = async (params) => {
  return post(prefix + '/authorizations', params)
}
export const captchas = async (params) => {
  return post('/captchas', params)
}

export const Codes = async (params) => {
  return post('/verificationCodes', params)
}

export const info = async =>{
  return get('/user')
}
