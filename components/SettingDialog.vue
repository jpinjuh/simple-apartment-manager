<template>
  <v-dialog
    v-model="dialog"
    width="350"
  >
    <v-card>
      <v-toolbar color="primary" dark class="elevation-0">
        <v-toolbar-title>Reorder columns</v-toolbar-title>
        <v-spacer />
        <v-btn dark icon @click.native="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- draggable list -->
      <v-container>
        <v-row>
          <v-col class="pa-6">
            <draggable
              ghost-class="ghost"
              :list="headers"
              @start="dragging = true"
              @end="dragging = false"
            >
              <div
                v-for="(header, index) in headers"
                :key="index"
                class="header-list d-flex justify-center align-center py-3 mb-1"
              >
                {{ header.text }}
              </div>
            </draggable>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },

  props: ['headers'],

  data () {
    return {
      dialog: false,
      tableHeaders: [],
      dragging: false
    }
  },

  created () {
    this.$nuxt.$on('open-settings', () => {
      this.dialog = true
    })
  },

  beforeDestroy () {
    this.$nuxt.$off('open-settings')
  },

  methods: {
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>

<style>
  .ghost {
    opacity: 0.4;
  }

  .header-list {
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    background-color: #f3f3f3;
    cursor: pointer;
  }
</style>
