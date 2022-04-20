import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: []
  },
  getters: {},
  mutations: {
    ADD_TEAM(state, newTeam) {
      let largestId = state.teams.reduce((maxFound, curTeam) => Math.max(maxFound, curTeam.id), 0);
      newTeam.id = largestId + 1;
      state.teams.push(newTeam);
    }
  },
  actions: {},
  modules: {}
})