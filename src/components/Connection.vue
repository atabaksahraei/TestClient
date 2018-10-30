<template>
  <div v-if="this.$root.isConnected">
    <img src="../assets/logo.png">
    <h1>{{ title }}</h1>
    <div>{{ msg }}</div>
    <div>{{ this.$root.areas }}</div>
        <md-button class="md-raised md-primary" v-on:click="disconnect">Disconnect</md-button>
  </div>
  <div v-else>
    <h1>Connect to your GIO-Server</h1>
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
import axios from 'axios'

export default {
  name: 'Connection',
  data: () => ({
    title: 'You are connected :)',
    msg: '',
    url: 'localhost:44392',
    sending: false
  }),

  methods: {
    connect: function () {
      const vm = this
      vm.sending = true
      axios.defaults.baseURL = 'https://' + 'localhost:44392'
      axios
        .get('/ping')
        .then(response => {
          vm.msg = response.data
          vm.$root.isConnected = true
          vm.sending = false
        })
    },
    disconnect: function () {
      const vm = this
      vm.$root.isConnected = false
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
