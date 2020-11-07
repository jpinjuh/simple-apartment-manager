<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '../components/Snackbar'

export default {
  components: {
    Snackbar
  },

  data () {
    return {}
  }
}
</script>
