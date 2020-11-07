<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex align-center">
          <v-icon
            @click="$nuxt.$emit('open-settings', headers)"
          >mdi-cog</v-icon>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end align-center">
          <v-btn
            depressed
            color="primary"
          >
            <v-icon>mdi-plus</v-icon>
            Dodaj
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items="items"
          :headers="headers"
        >
          <template v-slot:[`item.building`]={item}>
            {{ item.building ? item.building.adress : '' }}
          </template>
          <template v-slot:[`item.lift`]={item}>
            {{ item.lift ? 'Yes' : 'No' }}
          </template>
          <template v-slot:[`item.actions`]="{}">
            <v-btn
              depressed
              color="primary"
            >
              <v-icon
                color="white"
                size="16"
              >mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              depressed
              class="red darken-2"
            >
              <v-icon
                  color="white"
                  size="16"
              >mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Table setting dialog -->
    <SettingDialog />
  </v-container>
</template>

<script>
import SettingDialog from '../components/SettingDialog'
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
      ],
      items: [
        {
          title: 'dd',
          state: 'active',
          area: 'ddd',
          rooms: 4,
          lift: false,
          building: null,
          rentalgross: 1000
        }
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
