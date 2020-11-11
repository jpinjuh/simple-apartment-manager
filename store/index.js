export const state = () => ({
  apartments: [],
  dialog: false
})

export const getters = {
  getApartments (state) {
    return state.apartments
  }
}

export const mutations = {
  setApartments (state, apartments) {
    state.apartments = apartments
  },

  deleteApartment (state, index) {
    state.apartments.splice(index, 1)
  },

  addApartment (state, form) {
    /* generate unique ID */
    form.title = '_' + Math.random().toString(36).substr(2, 9)

    state.apartments.push(form)
  },

  updateApartment (state, { form, index }) {
    state.apartments.splice(index, 1, form)
  }
}

export const actions = {
  async getApartments ({ commit }) {
    await this.$axios.get('/')
      .then((res) => {
        if (res.status === 200) {
          commit('setApartments', res.data)
        }
      })
  },

  deleteApartment ({ commit }, payload) {
    commit('deleteApartment', payload)
  },

  addApartment ({ commit }, payload) {
    commit('addApartment', payload)
  },

  updateApartment ({ commit }, payload) {
    commit('updateApartment', payload)
  }
}
