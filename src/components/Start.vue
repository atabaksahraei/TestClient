<template>
  <div >
    <h1 v-if="selectedName != null && selectedName != '' ">My name is {{ selectedName }}</h1>
    <md-autocomplete v-model="selectedName" :md-options="names">
      <label>Names</label>
    </md-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'CallMyName',
  data () {
    return {
      selectedName: '',
      names: [
        'Atabak',
        'Isabell',
        'Martin',
        'Hans',
        'Peter',
        'Kai',
        'Sascha',
        'Ati'
      ]
    }
  }
}
</script>
