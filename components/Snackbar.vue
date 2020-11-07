<template>
  <v-snackbar
    :bottom="false"
    :color="color"
    :left="false"
    :right="true"
    :timeout="timeout"
    :top="true"
    v-model="model">
      {{ text }}
    <template v-slot:action="{ attrs }">
        <v-btn
          @click="model = false"
          color="white"
          dark
          text
          v-bind="attrs">
            OK
        </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {

  components: {},

  created () {
    this.$nuxt.$on('show-snackbar', (success = true, message = '') => {
      this.showSnackbar(success, message)
    })
  },

  methods: {
    showSnackbar (success = true, message = '') {
      this.text = message === ''
        ? success ? this.textSuccess : this.textWentWrong
        : message
      this.timeout = success ? 3000 : 30000
      this.color = success ? 'success' : 'error'
      this.model = true
    }
  },

  data () {
    return {
      model: false,
      text: '',
      timeout: 3000,
      color: 'success',
      textWentWrong: 'Nešto je pošlo krivo!',
      textRequiredField: 'Provjerite obavezna polja!',
      textSuccess: 'Uspješno!'
    }
  }
}
</script>
