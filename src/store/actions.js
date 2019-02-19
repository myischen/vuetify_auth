// https://vuex.vuejs.org/en/actions.html

import * as utils from '@/utils/utils'
export default {
  checkAuth ({
    commit
  }) {
    let data = {
      user: sessionStorage.getItem('user'),
      token: sessionStorage.getItem('token')
    }
    commit('setAuth', data)
  }
}
