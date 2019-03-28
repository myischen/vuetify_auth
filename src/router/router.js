import Layout from '@/components/layouts'

export const routerMap = [{
  path: '',
  name: 'home',
  component: Layout,
  children: [{
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard'),
    meta: {
      title: '首页'
    }
  }]
}, {
  path: '/test',
  name: 'manage_contents',
  meta: {
    title: 'contacts',
    icon: 'contacts'
  },
  component: Layout,
}];

export const routes = [{
    path: '/singin',
    name: 'singin',
    component: () => import('@/views/Singin')
  }, {
    path: '/singup',
    name: 'singup',
    component: () => import('@/views/Singup')
  },
  // {
  //   path: '*',
  //   component: () => import('@/views/Home')
  // },
];
