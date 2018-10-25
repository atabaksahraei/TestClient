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

export default new Router({
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
