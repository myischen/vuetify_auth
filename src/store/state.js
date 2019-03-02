import ls from '@/utils/localStorage';
// https://vuex.vuejs.org/en/state.html



export default {
  Drawer: false,
  user: ls.getItem('user'),
  auth: ls.getItem('auth'),
  token: ls.getItem('token')
}
