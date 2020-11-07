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
      <v-col>
        Character(s)
        <span class="max-char font-weight-bold">{{ Object.keys(maxChar).join(', ') }}</span>
        occurs
        <span class="max-char font-weight-bold text-title">{{ Object.values(maxChar)[0] }}</span>
        time(s).
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    maxChar () {
      let max = 0

      const obj = {}
      for (const char of this.inputValue.split(' ').join('')) {
        obj[char] = obj[char] + 1 || 1
      }

      Object.keys(obj).forEach((char) => {
        if (obj[char] > max) {
          max = obj[char]
        }
      })

      return Object.entries(obj).filter(([k, v]) => v === max).reduce((acc, val) => {
        const [key, value] = val
        acc[key] = value
        return acc
      }, {})
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
