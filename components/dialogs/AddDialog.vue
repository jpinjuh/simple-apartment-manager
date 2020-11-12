<template>
  <v-dialog
    v-model="dialog"
    width="400"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
        class="elevation-0"
      >
        <v-toolbar-title>{{ formTitle }}</v-toolbar-title>

        <v-spacer />

        <v-btn
          dark
          icon
          @click="closeDialog"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-container class="pt-8 px-6">
        <v-row
          v-for="item in items"
          :key="item.name"
        >
          <v-col class="pt-0">
            <!-- Textfield -->
            <v-text-field
              v-if="item.tag === 'input'"
              v-model="form[item.name]"
              dense
              :name="item.name"
              :type="item.type"
              outlined
              :label="item.title"
            />

            <!-- Select field -->
            <v-select
              v-if="item.tag === 'select'"
              v-model="form[item.name]"
              outlined
              dense
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
              @click="saveItem"
            >
              Save
            </v-btn>
            <v-btn
              outlined
              depressed
              class="text-none"
              large
              @click="closeDialog"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      form: {},
      action: '',
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
    formTitle () {
      return (this.editIndex > -1) ? 'Edit item' : 'Add item'
    }
  },

  created () {
    this.$nuxt.$on('show-add-dialog', (action, form = null, index = -1) => {
      this.dialog = true
      this.action = action
      this.editIndex = index

      /* ako je prosljeđena forma od edita spremi je u this.form */
      if (form) {
        this.form = form
      }
    })

    this.$nuxt.$on('close-add-dialog', () => {
      this.dialog = false
    })
  },

  methods: {
    closeDialog () {
      this.dialog = false
      this.form = {}
    },

    saveItem () {
      /* parsing form data */
      this.form.area = parseInt(this.form.area) || null
      this.form.rooms = parseFloat(this.form.rooms) || null
      this.form.rentalgross = parseInt(this.form.rentalgross) || null

      this.form.building = { adress: this.form.adress }

      if (this.editIndex > -1) {
        this.$store.dispatch(this.action, { form: this.form, index: this.editIndex })
          .then(() => {
            this.closeDialog()
            this.$nuxt.$emit('show-snackbar', true)
          })
      } else {
        this.$store.dispatch(this.action, this.form)
          .then(() => {
            this.closeDialog()
            this.$nuxt.$emit('show-snackbar', true)
          })
      }
    }
  }
}
</script>
