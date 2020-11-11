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
            @click="addDialog = true"
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

    <v-dialog
      v-model="addDialog"
      width="400"
      @click:outside="closeAddDialog"
    >
      <v-card>
        <v-toolbar color="primary" dark class="elevation-0">
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>

          <v-spacer />

          <v-btn dark icon @click.native="closeAddDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container class="pt-8 px-6">
          <v-row v-for="item in items" :key="item.name">
            <v-col class="pt-0">
              <!-- Textfield -->
              <v-text-field
                v-if="item.tag === 'input'"
                v-model="form[item.name]"
                dense
                :name="item.name"
                :type="item.type"
                outlined
                :placeholder="item.rules && item.rules.includes('required') ? 'Required...' : ''"
                :label="item.title"
              />

              <!-- Select field -->
              <v-select
                v-if="item.tag === 'select'"
                v-model="form[item.name]"
                outlined
                dense
                :placeholder="item.rules ? 'Obavezno..' : ''"
                :items="item.source"
                :label="item.title"
                :name="item.name"
              />

              <!-- Checkbox -->
              <v-checkbox
                v-if="item.tag === 'checkbox'"
                v-model="form[item.name]"
                dense
                :name="item.name"
                :label="item.title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                depressed
                class="text-none mr-3"
                large
                @click="handleAction"
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
      editIndex: -1,
      title: '',
      form: {
        lift: false
      },
      items: [
        {
          name: 'state',
          tag: 'select',
          source: ['active', 'assigned', 'inactive', 'reserved', 'vacant'],
          title: 'State',
          type: 'text'
        },
        {
          name: 'area',
          tag: 'input',
          title: 'Area',
          type: 'number'
        },
        {
          name: 'rooms',
          tag: 'input',
          title: 'Rooms',
          type: 'number'
        },
        {
          name: 'lift',
          tag: 'checkbox',
          title: 'Lift',
          type: 'boolean'
        },
        {
          name: 'adress',
          tag: 'input',
          title: 'Address',
          type: 'text'
        },
        {
          name: 'rentalgross',
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
    },

    formTitle () {
      return (this.editIndex > -1) ? 'Edit apartment' : 'Add apartment'
    }
  },

  methods: {
    openDeleteDialog (item) {
      this.editIndex = this.apartments.indexOf(item)
      this.$nuxt.$emit('show-delete-dialog', 'deleteApartment', this.editIndex)
    },

    closeAddDialog () {
      this.addDialog = false
      this.form = { lift: false }
      this.editIndex = -1
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

      this.title = title
      this.addDialog = true
    },

    handleAction () {
      /* parsing form data */
      this.form.area = parseInt(this.form.area) || null
      this.form.rooms = parseFloat(this.form.rooms) || null
      this.form.rentalgross = parseInt(this.form.rentalgross) || null

      this.form.building = { adress: this.form.adress }

      if (this.editIndex > -1) {
        this.updateApartment()
      } else {
        this.addApartment()
      }
    },

    addApartment () {
      this.$store.dispatch('addApartment', this.form)
        .then(() => {
          this.closeAddDialog()
          this.$nuxt.$emit('show-snackbar', true)
        })
    },

    updateApartment () {
      this.$store.dispatch('updateApartment', { form: this.form, index: this.editIndex })
        .then(() => {
          this.closeAddDialog()
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
