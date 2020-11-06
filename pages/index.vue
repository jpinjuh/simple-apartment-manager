<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-tabs v-model="selected">
        <v-tab
          v-for="(link, index) in navLinks"
          :key="link + '_' + index"
          class="text-capitalize"
          @click="selected = index"
        >
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-col>

    <v-col cols="12">
      <ApartmentTableView v-if="selected === 0" />
      <CodingChallenge v-if="selected === 1" />
    </v-col>
  </v-row>
</template>

<script>
import ApartmentTableView from '../components/ApartmentTableView'
import CodingChallenge from '../components/CodingChallenge'

export default {
  components: {
    ApartmentTableView,
    CodingChallenge
  },

  data () {
    return {
      selected: 0,
      navLinks: [
        'simple app manager',
        'coding challenge'
      ]
    }
  },

  created () {
    this.$store.dispatch('getApartments')
  }
}
</script>
