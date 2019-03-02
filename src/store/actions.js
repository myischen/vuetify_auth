// https://vuex.vuejs.org/en/actions.html

import router from '@/router';

export default {
  singIn({
    commit
  }, user) {
    if (user) commit('updateUser', user);
    // 更新当前用户的登录状态为已登录
    commit('updateAuth', true);
    router.push('/Home');
  },
  signOut({commit}){
    commit('updateAuth', false);
    router.push({ name: 'Home', params: { logout: true } });
  },
  checkToken({
    commit
  }) {
    let data = {
      token: sessionStorage.getItem('token')
    }
    commit('updateToken', data);
  },
   // 更新个人信息
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }
    commit('updateUser', user)
  }
}
