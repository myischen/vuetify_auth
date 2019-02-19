export const routerMap = []

export const routes = [{
  path: '/singin',
  name: 'login',
  component: () => import('@/views/Singin')
}, {
  path: '/singup',
  name: 'singup',
  component: () => import('@/views/Singup')
},
{
  path: '*',
  component: () => import('@/views/Home')
}
]
