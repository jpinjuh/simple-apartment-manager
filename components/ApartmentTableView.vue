<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex align-center" style="height: 100%;">
          <v-icon
            @click="$nuxt.$emit('open-settings')"
          >
            mdi-cog
          </v-icon>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end align-center">
          <v-btn
            depressed
            color="primary"
            class="text-none"
            @click="openAddDialog()"
          >
            <v-icon class="mr-2">
              mdi-plus
            </v-icon>
            Add
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items="apartments"
          :headers="headers"
        >
          <template v-slot:[`item.building`]="{item}">
            {{ item.building ? item.building.adress : '' }}
          </template>
          <template v-slot:[`item.lift`]="{item}">
            {{ item.lift ? 'Yes' : 'No' }}
          </template>
          <!-- table action buttons -->
          <template v-slot:[`item.actions`]="{item}">
            <v-btn
              depressed
              color="primary"
              @click="openEdit(item)"
            >
              <v-icon
                color="white"
                size="16"
              >
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              depressed
              color="error"
              @click="openDeleteDialog(item)"
            >
              <v-icon
                color="white"
                size="16"
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Table setting dialog for reordering columns-->
    <SettingDialog :headers="headers" />
  </v-container>
</template>

<script>
import SettingDialog from '../components/dialogs/SettingDialog'

export default {
  components: {
    SettingDialog
  },

  data () {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'State', value: 'state' },
        { text: 'Area', value: 'area' },
        { text: 'Rooms', value: 'rooms' },
        { text: 'Lift', value: 'lift' },
        { text: 'Address', value: 'building' },
        { text: 'Rentalgross', value: 'rentalgross' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },

  computed: {
    apartments () {
      return this.$store.getters.getApartments
    }
  },

  methods: {
    openAddDialog () {
      /* prosljedivanje imena akcije u add dialog */
      this.$nuxt.$emit('show-add-dialog', 'addApartment')
    },

    openDeleteDialog (item) {
      /* prosljedivanje imena akcije i indexa u delete dialog */
      this.editIndex = this.apartments.indexOf(item)
      this.$nuxt.$emit('show-delete-dialog', 'deleteApartment', this.editIndex)
    },

    openEdit (item) {
      const { title, state, area, rooms, lift, building, rentalgross } = item

      this.editIndex = this.apartments.indexOf(item)

      this.form = {
        title,
        state,
        area,
        rooms,
        lift,
        rentalgross
      }
      this.form.adress = building ? building.adress : null

      /* prosljedivanje imena akcije i indexa u delete dialog */
      this.$nuxt.$emit('show-add-dialog', 'updateApartment', this.form, this.editIndex)
    }
  }
}
</script>

<style scoped>
  .v-input--selection-controls {
    margin-top: 0;
  }
</style>
