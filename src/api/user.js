import {
  get,
  post
} from '@/utils/request'

const prefix = '/sso'

export const create = (params) => {
  return post(prefix + '/authorizations', params)
}
