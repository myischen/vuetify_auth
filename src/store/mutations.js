// https://vuex.vuejs.org/en/mutations.html

import ls from '@/utils/localStorage'
export default {
  updateUser(state, user) {
    state.user = user;
    ls.setItem('user', user);
  },
  updateAuth(state, auth) {
    state.auth = auth;
    ls.setItem('auth', auth);
  },
  updateToken(state, token) {
    state.token = token;
    ls.setItem('token', token);
  },
}
