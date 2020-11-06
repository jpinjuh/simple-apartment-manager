<template>
  <div>
    <v-data-table
      :items="apartments"
      :headers="headers"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      headers: [
        { text: 'Title', value: 'title' }
      ]
    }
  },

  computed: {
    apartments () {
      return this.$store.getters.getApartments
    }
  }
}
</script>
