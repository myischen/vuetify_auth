// https://vuex.vuejs.org/en/mutations.html

import * as utils from '@/utils/utils'
export default {
  setAuth (state, {
    user,
    token
  }) {
    state.user = user
    state.token = token
    sessionStorage.setItem('user', user)
    sessionStorage.setItem('token', token)
  }
}
