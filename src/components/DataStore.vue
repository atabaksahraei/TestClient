<template>
  <div>
    <h1>DataStore: {{ entity }}</h1>
    <div class="md-layout-item">
      <md-field>
        <label for="areas">DataStores</label>
        <md-select v-model="entity" name="areas" id="areas" md-dense>
          <md-option v-for="singleEntity in entities" :key="singleEntity" :value="singleEntity">{{ singleEntity }}</md-option>
        </md-select>
        <md-button class="md-icon-button md-dense md-raised md-primary" v-on:click="loadDataStores">
          <md-icon>cached</md-icon>
        </md-button>
      </md-field>
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
  name: 'Synchronization',
  data: () => ({
    entity: '',
    entities: [],
    data: [],
    keys: []
  }),
  mounted: function () {
    this.loadDataStores()
  },
  methods: {
    loadDataStores: function () {
      const vm = this
      axios
        .get('/api/datastore')
        .then(response => {
          vm.entities = response.data
        })
    },
    getAll: function () {
      const vm = this
      axios
        .get('/api/' + this.entity)
        .then(response => {
          vm.data = response.data
          vm.keys = Object.keys(vm.data[0])
        })
    }
  },
  watch: {
    entity: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.getAll()
        }
      },
      deep: true
    }
  }
}
</script>
