import Vue from 'vue'
import Router from 'vue-router'
import {
  routes
} from './router'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const username = store.state.user.name;
  const userMenu = sessionStorage.userMenu;
  const hasGetRules = store.state.router.hasGetRules;
  if (username && userMenu.length > 0) {
    if (!hasGetRules) {
      store.dispatch('getPermission', userMenu).then(routers => {
        router.addRoutes(routers);
        next({
          ...to,
          replace: true
        });
      });
    } else {
      next();
    }
  } else {
    if (to.name === 'singin') next();
    else next({
      name: 'singin'
    });
  }
});
export default router
