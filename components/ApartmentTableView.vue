<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex align-center" style="height: 100%;">
          <v-icon
            @click="$nuxt.$emit('open-settings')"
          >mdi-cog</v-icon>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end align-center">
          <v-btn
            depressed
            color="primary"
            @click="addDialog = true"
          >
            <v-icon>mdi-plus</v-icon>
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
          <template v-slot:[`item.building`]={item}>
            {{ item.building ? item.building.adress : '' }}
          </template>
          <template v-slot:[`item.lift`]={item}>
            {{ item.lift ? 'Yes' : 'No' }}
          </template>
          <!-- table action buttons -->
          <template v-slot:[`item.actions`]={item}>
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
              @click="openDeleteDialog(item.title)"
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

    <v-dialog
      width="400"
      v-model="addDialog"
      @click:outside="closeAddDialog"
    >
      <v-card>
        <v-toolbar color="primary" dark class="elevation-0">
            <v-toolbar-title>Add</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn @click.native="closeAddDialog" dark icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container class="pt-8 px-6">{{form}}
          <v-row v-for="item in items" :key="item.name">
            <v-col>
              <!-- Textfield -->
              <v-text-field
                  dense
                  :name="item.name"
                  :type="item.type"
                  outlined
                  :placeholder="item.rules && item.rules.includes('required') ? 'Required...' : ''"
                  :label="item.title"
                  v-if="item.tag === 'input'"
                  v-model="form[item.name]"
              ></v-text-field>

              <!-- Select field -->
              <v-select
                outlined
                dense
                :placeholder="item.rules ? 'Obavezno..' : ''"
                :items="item.source"
                :label="item.title"
                :name="item.name"
                v-if="item.tag === 'select'"
                v-model="form[item.name]">
              </v-select>

              <!-- Checkbox -->
              <v-checkbox
                dense
                :name="item.name"
                :label="item.title"
                v-if="item.tag === 'checkbox'"
                v-model="form[item.name]">
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                depressed
                class="text-none mr-3"
                large
                @click="addApartment"
              >
                Save
              </v-btn>
              <v-btn
                outlined
                depressed
                class="text-none"
                large
                @click="closeAddDialog"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->
    <v-dialog
      v-model="deleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title
            primary-title>
          Are you sure?
        </v-card-title>

        <v-card-text class="pt-5">
          Are you sure you want to delete the selected resource?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-none" @click="deleteDialog = false" depressed large outlined>Odustani</v-btn>
          <v-btn class="text-none" color="error" @click="deleteApartment" depressed large>Izbriši</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Table setting dialog for reordering columns-->
    <SettingDialog :headers="headers" />
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
      deleteDialog: false,
      addDialog: false,
      form: {
        lift: false
      },
      items: [
        {
          name: 'state',
          rules: '',
          tag: 'select',
          source: ['active', 'assigned', 'inactive', 'reserved', 'vacant'],
          title: 'State',
          type: 'text'
        },
        {
          name: 'area',
          rules: '',
          tag: 'input',
          title: 'Area',
          type: 'number'
        },
        {
          name: 'rooms',
          rules: '',
          tag: 'input',
          title: 'Rooms',
          type: 'number'
        },
        {
          name: 'lift',
          rules: '',
          tag: 'checkbox',
          title: 'Lift',
          type: 'boolean'
        },
        {
          name: 'adress',
          rules: '',
          tag: 'input',
          title: 'Address',
          type: 'text'
        },
        {
          name: 'rentalgross',
          rules: '',
          tag: 'input',
          title: 'Rentalgross',
          type: 'number'
        }
      ]
    }
  },

  computed: {
    apartments () {
      return this.$store.getters.getApartments
    }
  },

  methods: {
    openDeleteDialog (title) {
      this.deleteDialog = true
      this.title = title
    },

    closeAddDialog () {
      this.addDialog = false
      this.form = {
        lift: false
      }
    },

    deleteApartment () {
      this.$store.dispatch('deleteApartment', this.title)
        .then(() => {
          this.deleteDialog = false
          this.$nuxt.$emit('show-snackbar', true)
        })
    },

    addApartment () {
      this.$store.dispatch('addApartment', this.form)
        .then(() => {
          this.addDialog = false
          this.$nuxt.$emit('show-snackbar', true)
        })
    }
  }
}
</script>

<style scoped>
  .v-input--selection-controls {
    margin-top: 0;
  }
</style>
