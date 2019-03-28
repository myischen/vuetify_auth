import {
  routerMap
} from '@/router/router';

const state = {
  routers: [],
  hasGetRules: false
};

const mutations = {
  SET_ROUTES(state, routerList) {
    state.routers = routerList
    state.hasGetRules = true
  }
};

const getAccesRouterList = (routerMap, rules) => {
  return routerMap.filter(item => {
    if (rules.indexOf(item.name) > -1) {
      if (item.children) {
        item.children = getAccesRouterList(item.children, rules)
      }
      return true
    } else {
      return false
    }
  })
}

const actions = {
  getPermission({
    commit
  }, rules) {
    return new Promise((resolve, reject) => {
      try {
        let routerList = [];
        routerList = getAccesRouterList(routerMap, rules);
        commit('SET_ROUTES', routerList);
        resolve(routerList);
      } catch (error) {
        reject(error);
      }
    })
  }
};

export default {
  state,
  mutations,
  actions
};
