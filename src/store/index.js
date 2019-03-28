/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue';
import Vuex from 'vuex';

// Store functionality
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';
import router from './modules/router';
import user from './modules/user';

Vue.use(Vuex);

// Create a new store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    router,
    user
  }
});

export default store;
