export const routerMap = []


export const routes = [{
    path: '/singin',
    name: 'login',
    component: () => import('@/views/Singin')
  },
  // {
  //   path: '/',
  //   redirect: '/system/user'
  // },
  {
    path: '*',
    component: () => import('@/views/Home')
  }
]
