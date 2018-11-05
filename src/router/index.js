import Vue from 'vue'
import Router from 'vue-router'

// Base Components
import Connection from '@/components/Connection'
import NotFound from '@/components/NotFound'
import Property from '@/components/Property'
import Runtime from '@/components/Runtime'
import DataStore from '@/components/DataStore'
import Synchronization from '@/components/Synchronization'

// Material Config
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/connection' },
    { path: '/connection', name: 'Connection', component: Connection },
    { path: '/dataStore', name: 'DataStore', component: DataStore },
    { path: '/property', name: 'Property', component: Property },
    { path: '/synch', name: 'Synchronization', component: Synchronization },
    { path: '/runtime', name: 'Runtime', component: Runtime },
    { path: '*', name: 'Not found', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/connection']
  const connectionRequired = !publicPages.includes(to.path)
  if (connectionRequired && !router.app.isConnected) {
    return next('/connection')
  }

  next()
})

export default router
