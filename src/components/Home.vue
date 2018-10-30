<template>
  <div v-if="this.$root.isConnected">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
  <div v-else>
    <h1>Connect to your GIO-Server</h1>
    <p>{{message}}</p>
    <div class="md-layout-item md-small-size-100">
      <md-field>
        <label for="url">URL</label>
        <md-input name="url" v-model="url" :disabled="sending" />
      </md-field>
    </div>
    <md-button class="md-raised md-primary" v-on:click="connect" :disabled="sending">Connect</md-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    msg: 'Hi Vue.js :)',
    url: 'https://',
    sending: false,
    message: 'Test'
  }),

  methods: {
    connect: function () {
      const vm = this
      vm.sending = true
      vm.message = 'Connecting'
      console.log('Connecting to ' + this.url + '...')
      console.log(this)
      this.$root.isConnected = true
      vm.sending = false
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
