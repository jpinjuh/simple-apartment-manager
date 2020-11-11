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

  deleteApartment (state, title) {
    const index = state.apartments.findIndex(apartment => apartment.title === title)
    state.apartments.splice(index, 1)
  },

  addApartment (state, form) {
    /* generate unique ID */
    form.title = '_' + Math.random().toString(36).substr(2, 9)

    state.apartments.push(form)
  },

  updateApartment (state, { form, title }) {
    const index = state.apartments.findIndex(apartment => apartment.title === title)

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

  deleteApartment ({ commit }, title) {
    commit('deleteApartment', title)
  },

  addApartment ({ commit }, form) {
    commit('addApartment', form)
  },

  updateApartment ({ commit }, { form, title }) {
    commit('updateApartment', { form, title })
  }
}
