<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" id="wrapper">
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <md-icon v-if="this.$root.isConnected == false" >mobile_off</md-icon>
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>
            Navigation
          </span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list id="menu">

          <md-list-item to='/connection'>
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Connection</span>
          </md-list-item>

          <md-list-item to='/datastores' :disabled="this.$root.isConnected == false">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">DataStores</span>
          </md-list-item>

          <md-list-item to='/property' :disabled="this.$root.isConnected == false">
            <md-icon>settings_input_component</md-icon>
            <span class="md-list-item-text">Properties</span>
          </md-list-item>

          <md-list-item to='/Runtime' :disabled="this.$root.isConnected == false">
            <md-icon>healing</md-icon>
            <span class="md-list-item-text">Runtime</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menuVisible: false,
    title: ''
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#wrapper{
   height: 100vh;
}
</style>
