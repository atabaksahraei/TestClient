import Vue from 'vue'
import Router from 'vue-router'

// Base Components
import Home from '@/components/Home'
import Start from '@/components/Start'
import NotFound from '@/components/NotFound'

// Material Config
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/name',
      name: 'MyName',
      component: Start
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/name']
  const connectionRequired = !publicPages.includes(to.path)
  if (connectionRequired && !this.a.app.isConnected) {
    return next('/')
  }

  next()
})

export default router
