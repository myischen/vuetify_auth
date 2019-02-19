import {
  get,
  post
} from '@/utils/request'

const prefix = '/sso'

export const singin = async (params) => {
  return post(prefix + '/authorizations', params)
}

export const info = async (params) => {
  return get('/user')
}
