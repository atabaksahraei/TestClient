// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
this.$optionsObject.isConnected = true

Vue.mixin({
  data: () => ({
  }),
  methods: {
    assertConnected () {
      if (!this.isConnected) {
        console.log('Not Connected')
        router.push({ path: '/' })
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
