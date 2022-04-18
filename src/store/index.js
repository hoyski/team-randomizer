import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [{
        id: 1,
        name: 'Brewery Finder',
        members: [
          'John Smith',
          'Jill Jones',
          'Joe Momma'
        ]
      },
      {
        id: 2,
        name: 'Workout Builder',
        members: [
          'Adam Adams',
          'Sam Sung',
          'Aaron Aardvard'
        ]
      }
    ]
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})