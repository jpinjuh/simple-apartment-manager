<template>
  <v-container>
    <v-row>
      <v-col class="title">
        Start typing and find out which character occurs the most times:
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="inputValue"
          outlined
          placeholder="Start typing..."
          hide-details
        />
      </v-col>
      <v-col cols="12">
        <div class="mb-4 font-weight-bold">
          Using JavaScript:
        </div>
        <div>
          Character
          <span class="max-char font-weight-bold">{{ maxChar.char }}</span>
          occurs
          <span class="max-char font-weight-bold text-title">{{ maxChar.value }}</span>
          time(s).
        </div>
      </v-col>
      <v-col cols="12">
        <div class="mb-4 font-weight-bold">
          Using Loadsh:
        </div>
        <div>
          Character
          <span class="max-char font-weight-bold">{{ loadshMaxChar[0] }}</span>
          occurs
          <span class="max-char font-weight-bold text-title">{{ loadshMaxChar[1] }}</span>
          time(s).
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { countBy, entries, flow, last, maxBy, partialRight } from 'lodash'

export default {
  components: {},

  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    maxChar () {
      const obj = {}
      let max = 0
      let maxChar = ''

      if (this.inputValue) {
        for (const char of this.inputValue.replace(/\s/g, '')) {
          obj[char] = obj[char] + 1 || 1
        }

        Object.keys(obj).forEach((char) => {
          if (obj[char] > max) {
            maxChar = char
            max = obj[char]
          }
        })

        return {
          char: maxChar,
          value: max
        }
      }

      return this.inputValue
    },

    loadshMaxChar () {
      if (this.inputValue) {
        const inputText = this.inputValue.replace(/\s/g, '')

        return flow(
          countBy,
          entries,
          partialRight(maxBy, last)
        )(inputText)
      }

      return this.inputValue
    }
  }
}
</script>

<style scoped>
  .max-char {
    padding: 4px 16px;
    margin: 0 4px;
    background-color: rgb(209, 209, 209);
  }
</style>
