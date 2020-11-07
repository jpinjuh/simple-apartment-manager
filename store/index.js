export const state = () => ({
  apartments: []
})

export const getters = {
  getApartments (state) {
    return state.apartments
  }
}

export const mutations = {
  setApartments (state, apartments) {
    state.apartments = apartments
  }
}

export const actions = {
  async getApartments ({ commit }) {
    const { data } = await this.$axios.get('/')
    commit('setApartments', data)
  }
}
