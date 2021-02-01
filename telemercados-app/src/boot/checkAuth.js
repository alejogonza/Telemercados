export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('token')
    let protectedRoute = false

    if (to.path === '/' || to.path === '/register') {
      protectedRoute = true
    }
    if (!token && protectedRoute === false) {
      return next({
        path: '/'
      })
    }
    if (token && protectedRoute === true) {
      return next({
        path: '/products'
      })
    }
    next()
  })
}
