import Vue from 'vue'
import Router from 'vue-router'

// Base Components
import Connection from '@/components/Connection'
import Start from '@/components/Start'
import NotFound from '@/components/NotFound'
import Property from '@/components/Property'

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
      name: 'Connection',
      component: Connection
    },
    {
      path: '/connection',
      name: 'Connection',
      component: Connection
    },
    {
      path: '/property',
      name: 'Property',
      component: Property
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
  const publicPages = ['/', '/connection', '/name']
  const connectionRequired = !publicPages.includes(to.path)
  if (connectionRequired && !router.app.isConnected) {
    return next('/connection')
  }

  next()
})

export default router
