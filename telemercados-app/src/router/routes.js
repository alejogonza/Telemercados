const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/register.vue') }
    ]
  },
  {
    path: '/products',
    component: () => import('layouts/menu.vue'),
    children: [{ path: '/products', component: () => import('pages/products.vue') }]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
