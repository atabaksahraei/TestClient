<template>
  <div>
    <h1>Property: {{ area }}</h1>
    <div class="md-layout-item">
      <md-field>
        <label for="areas">Areas</label>
        <md-select v-model="area" name="areas" id="areas" md-dense>
          <md-option v-for="singleArea in this.$root.areas" :key="singleArea" :value="singleArea">{{ singleArea }}</md-option>
        </md-select>
          <md-button class="md-icon-button md-dense md-raised md-primary" v-on:click="load">
        <md-icon>cached</md-icon>
      </md-button>
      </md-field>
    </div>
    <div>
      <md-table md-card>
        <md-table-row>
          <md-table-head>Key</md-table-head>
          <md-table-head>Value</md-table-head>
        </md-table-row>

        <md-table-row v-for="item in table" :key="item.key">
          <md-table-cell> {{ item.key }} </md-table-cell>
          <md-table-cell> {{ item.value}} </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Property',
  data: () => ({
    area: '',
    table: []
  }),

  methods: {
    load: function () {
      const vm = this
      vm.msg = ''
      axios
        .get('/property/' + this.area)
        .then(response => {
          var result = response.data
          vm.table = []
          for (const key of Object.keys(result)) {
            vm.table.push(
              {
                'key': key,
                'value': result[key]
              }
            )
          }
        })
    }
  },
  watch: {
    area: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.load()
        }
      },
      deep: true
    }
  }
}
</script>
