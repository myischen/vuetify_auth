const state = {
  user: [] || sessionStorage.user,
  name: '' || sessionStorage.name,
  auth: false || sessionStorage.auth,
  token: '' || sessionStorage.token,
  userMenu: [] || sessionStorage.userMenu
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.name = user.name;
    sessionStorage.user = JSON.stringify(user);
    sessionStorage.name = user.name;
  },
  setAuth(state, auth) {
    state.auth = auth;
    sessionStorage.auth = auth;
  },
  setToken(state, token) {
    state.token = token;
    sessionStorage.token = token;
  },
  setMenu(state, userMenu) {
    state.userMenu = userMenu;
    sessionStorage.userMenu = JSON.stringify(userMenu);
  },
  singUp(state) {
    state.user = [];
    state.name = '';
    state.auth = '';
    state.auth = [];
    state.token = '';
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
  }
};

const getFlatUserMenu = (arr, arrMenu = []) => {
  arr.forEach(ele => {
    if (ele.children.length > 0) {
      arrMenu.push(ele.url)
      getFlatUserMenu(ele.children, arrMenu)
    } else {
      arrMenu.push(ele.url)
    }
  })
  return arrMenu
};

const actions = {
  singIn({
    commit
  }, user) {
    if (user) commit('setUser', user);
    // 更新当前用户的登录状态为已登录
    commit('setAuth', true);
  },
  signUp({
    commit
  }) {
    commit('setAuth', false);
    commit('singUp');
  },
  checkToken({
    commit
  }) {
    let data = {
      token: sessionStorage.getItem('token')
    }
    commit('setToken', data);
  },
  // 更新个人信息
  updateUser({
    state,
    commit
  }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = {
        ...stateUser,
        ...user
      }
    }
    commit('setUser', user);
  },
  getUserMenu({
    commit
  }, userMenu) {
    let flatMenu = []
    flatMenu = getFlatUserMenu(userMenu.children);
    commit('setMenu', flatMenu);
  },
};


export default {
  state,
  mutations,
  actions
}
