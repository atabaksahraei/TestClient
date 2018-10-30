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
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Connection',
  data: () => ({
    area: '',
    msg: '',
    url: 'localhost:44392'
  }),

  methods: {
    load: function () {
      this.msg = ''
      axios
        .get('/property/' + this.area)
        .then(response => {
          this.msg = response.data
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
