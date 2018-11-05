<template>
  <div>
    <h1>Synchronization: {{ fromEntity }} -> {{ toEntity }} </h1>
    <div class="md-layout-item">
      <md-button class="md-icon-button md-dense md-raised md-primary" v-on:click="loadDataStores">
        <md-icon>cached</md-icon>
      </md-button>
      <md-field>
        <label for="fromEntity">From</label>
        <md-select v-model="fromEntity" name="fromEntity" id="fromEntity" md-dense>
          <md-option v-for="singleEntity in entities" :key="singleEntity" :value="singleEntity">{{ singleEntity }}</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label for="toEntity">To</label>
        <md-select v-model="toEntity" name="toEntity" id="toEntity" md-dense>
          <md-option v-for="singleEntity in entities" :key="singleEntity" :value="singleEntity">{{ singleEntity }}</md-option>
        </md-select>
      </md-field>
      <md-button class="md-primary" v-on:click="detect">
        <md-icon>gradient</md-icon>
        Detect
      </md-button>
      <md-snackbar :md-position="center" :md-duration="4000" :md-active.sync="snackbarVisibility" md-persistent>
        <span>{{ snackbarMsg }}</span>
        <md-button class="md-primary" @click="snackbarVisibility = false">Ok</md-button>
      </md-snackbar>
    </div>
    <div>
      <md-table md-card>
        <md-table-row>
          <md-table-head v-for="key in keys" :key="key"> {{key}} </md-table-head>
        </md-table-row>
        <md-table-row v-for="item in data" :key="item">
          <md-table-cell v-for="cellKey in keys" :key="cellKey"> {{ item[cellKey] }} </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataStore',
  data: () => ({
    fromEntity: '',
    toEntity: '',
    entities: [],
    data: [],
    keys: [],
    snackbarVisibility: false,
    snackbarMsg: ''
  }),
  mounted: function () {
    this.loadDataStores()
  },
  methods: {
    showSnackbar: function (msg) {
      const vm = this
      vm.snackbarVisibility = false
      vm.snackbarMsg = ''

      if (msg !== '') {
        vm.snackbarMsg = msg
        vm.snackbarVisibility = true
      }
    },
    loadDataStores: function () {
      const vm = this
      axios
        .get('/api/datastore')
        .then(response => {
          vm.entities = response.data
        })
    },
    detect: function () {
      const vm = this
      if (this.toEntity === '' || this.fromEntity === '') {
        vm.showSnackbar('DataStores angeben (!)')
        return
      }
      var relUrl = '/detect/' + this.fromEntity + '/' + this.toEntity
      console.log(relUrl)
      axios
        .get(relUrl)
        .then(response => {
          vm.data = response.data
          vm.keys = Object.keys(vm.data[0])
        })
    }
  }
}
</script>
