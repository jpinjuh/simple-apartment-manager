<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title>
        Are you sure?
      </v-card-title>

      <v-card-text class="pt-5">
        Are you sure you want to delete the selected resource?
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          class="text-none"
          depressed
          large
          outlined
          @click="dialog = false"
        >
          Odustani
        </v-btn>
        <v-btn
          class="text-none"
          color="error"
          depressed
          large
          @click="deleteItem"
        >
          Izbriši
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      action: '',
      deleteIndex: null
    }
  },

  created () {
    this.$nuxt.$on('show-delete-dialog', (action, index) => {
      this.dialog = true
      this.action = action
      this.deleteIndex = index
    })

    this.$nuxt.$on('close-delete-dialog', () => {
      this.dialog = false
    })
  },

  methods: {
    deleteItem () {
      this.$store.dispatch(this.action, this.deleteIndex)
        .then(() => {
          this.dialog = false
          this.$nuxt.$emit('show-snackbar', true)
        })
    }
  }
}
</script>
