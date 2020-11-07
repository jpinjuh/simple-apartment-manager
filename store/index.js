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
    /* parsing form data */
    form.area = parseInt(form.area) || null
    form.rooms = parseFloat(form.rooms) || null
    form.rentalgross = parseInt(form.rentalgross) || null

    form.building = { adress: form.adress }

    /* generate unique ID */
    form.title = '_' + Math.random().toString(36).substr(2, 9)

    state.apartments.push(form)
  }
}

export const actions = {
  async getApartments ({ commit }) {
    const { data } = await this.$axios.get('/')
    commit('setApartments', data)
  },

  deleteApartment ({ commit }, title) {
    commit('deleteApartment', title)
  },

  addApartment ({ commit }, form) {
    commit('addApartment', form)
  }
}
