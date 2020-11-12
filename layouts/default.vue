<template>
  <v-app dark>
    <v-main>
      <v-app-bar
        color="primary"
        class="elevation-0"
      >
        <v-container>
          <v-row>
            <v-col>
              <nuxt-link to="/">
                <h3
                  class="white--text text-h5 text-sm-title"
                >
                  Apartment Manager
                </h3>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <Snackbar />
    <DeleteDialog />
    <AddDialog />
  </v-app>
</template>

<script>
import Snackbar from '../components/Snackbar'
import DeleteDialog from '../components/dialogs/DeleteDialog'
import AddDialog from '../components/dialogs/AddDialog'

export default {
  components: {
    Snackbar,
    DeleteDialog,
    AddDialog
  },

  data () {
    return {}
  }
}
</script>

<style>
  .v-slide-group__prev {
    display: none !important;
  }
</style>
