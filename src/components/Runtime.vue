<template>
  <div>
    <h1>Runtime:</h1>
    <div>{{ msg }}</div>
    <md-tabs>
      <md-tab id="tab-home" md-label="Ping" md-icon="toys">
        <md-button class="md-raised" v-on:click="doPing">Ping</md-button>
        <md-content v-for="audit in audits" :key="audit.timestamp" :class="audit.auditLevel">{{ audit | auditWithIndent }}</md-content>
      </md-tab>
      <md-tab id="tab-pages" md-label="Cache" md-icon="save_alt">
        <md-button class="md-raised" v-on:click="doClearCache">ClearCache</md-button>
        <div>{{ cacheMsg }}</div>
      </md-tab>
      <md-tab id="tab-posts" md-label="Settings" md-icon="build">
          <md-button class="md-icon-button md-dense md-raised md-primary" v-on:click="doLoadSettings">
            <md-icon>cached</md-icon>
          </md-button>
        <div>
        <md-table md-card>
          <md-table-row>
            <md-table-head>Key</md-table-head>
            <md-table-head>Value</md-table-head>
          </md-table-row>

          <md-table-row v-for="item in settingsTable" :key="item.key">
            <md-table-cell> {{ item.key }} </md-table-cell>
            <md-table-cell> {{ item.value}} </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
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
    settingsTable: '',
    audits: ''
  }),
  filters: {
    auditWithIndent: function (audit) {
      if (!audit) return ''
      var displayText = ''
      for (var i = 0; i < audit.indentation; i++) {
        displayText = displayText + '\t'
      }

      displayText = displayText + audit.message
      return displayText
    }
  },
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
      var vm = this
      vm.settingsTable = []
      axios
        .get('/settings')
        .then(response => {
          var result = response.data
          for (const key of Object.keys(result)) {
            vm.settingsTable.push(
              {
                'key': key,
                'value': result[key]
              }
            )
          }
        })
    }
  },
  mounted: function () {
    this.doLoadSettings()
  }
}
</script>
<style scoped>
.Debug {
  color: #FF9900;
  white-space: pre-wrap;
}
.Verbose {
  color: #888;
  white-space: pre-wrap;
}
.Info {
  color: #000;
  white-space: pre-wrap;
}
.Important {
  color: #000;
  font-weight: bold;
  white-space: pre-wrap;
}
.Warning {
  color: #ffff00;
  white-space: pre-wrap;
}
.Error {
  color: #ff2222;
  white-space: pre-wrap;
}
.Headline {
  color: #2255ff;
  white-space: pre-wrap;
}
</style>
