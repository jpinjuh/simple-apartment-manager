<template>
  <v-snackbar
    v-model="model"
    :bottom="false"
    :color="color"
    :left="false"
    :right="true"
    :timeout="timeout"
    :top="true"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        dark
        text
        v-bind="attrs"
        @click="model = false"
      >
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {

  components: {},

  data () {
    return {
      model: false,
      text: '',
      timeout: 3000,
      color: 'success',
      textWentWrong: 'Something went wrong!',
      textSuccess: 'Success!'
    }
  },

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
  }
}
</script>
