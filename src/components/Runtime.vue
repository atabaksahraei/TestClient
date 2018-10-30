<template>
  <div>
    <h1>Runtime:</h1>
    <div>{{ msg }}</div>
    <md-tabs>
      <md-tab id="tab-home" md-label="Ping" md-icon="toys">
        <md-button class="md-raised" v-on:click="doPing">Ping</md-button>
        <div v-for="audit in audits" :key="audit.timestamp" :class="audit.auditLevel">{{ audit.message }}</div>
      </md-tab>
      <md-tab id="tab-pages" md-label="Cache" md-icon="save_alt">
        <md-button class="md-raised" v-on:click="doClearCache">ClearCache</md-button>
        <div>{{ cacheMsg }}</div>
      </md-tab>
      <md-tab id="tab-posts" md-label="Settings" md-icon="build">
        <md-button class="md-raised" v-on:click="doLoadSettings">Settings</md-button>
        <div>{{ settingsMsg }}</div>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Runtime',
  data: () => ({
    msg: '',
    cacheMsg: '',
    settingsMsg: '',
    audits: ''
  }),
  methods: {
    doPing: function () {
      this.audits = ''
      this.msg = ''
      axios
        .get('/ping/providers')
        .then(response => {
          this.audits = response.data.audit
        })
    },
    doClearCache: function () {
      this.cacheMsg = ''
      this.msg = ''
      axios
        .get('/clearcache')
        .then(response => {
          this.cacheMsg = response.data
        })
    },
    doLoadSettings: function () {
      this.settingsMsg = ''
      this.msg = ''
      axios
        .get('/settings')
        .then(response => {
          this.settingsMsg = response.data
        })
    }
  }
}
</script>
<style scoped>
.Debug {
  color: #FF9900
}
.Verbose {
  color: #888
}
.Info {
  color: #000
}
.Important {
  color: #000;
  font-weight: bold;
}
.Warning {
  color: #ffff00
}
.Error {
  color: #ff2222
}
.Headline {
  color: #2255ff
}
</style>
