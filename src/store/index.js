import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const localTeamsJSON = localStorage.getItem('teams');
let localTeams = null;
if (localTeamsJSON) {
  localTeams = JSON.parse(localTeamsJSON);
}

export default new Vuex.Store({
  state: {
    teams: localTeams || []
  },
  getters: {},
  mutations: {
    ADD_UPDATE_TEAM(state, newTeam) {
      if (newTeam.id === undefined) {
        // Adding new team
        let largestId = state.teams.reduce((maxFound, curTeam) => Math.max(maxFound, curTeam.id), 0);
        newTeam.id = largestId + 1;
        state.teams.push(newTeam);
      } else {
        // Updating existing team
        let curTeam = state.teams.find((t) => t.id === newTeam.id);
        curTeam.name = newTeam.name;
        curTeam.members = newTeam.members;
      }
      localStorage.setItem('teams', JSON.stringify(state.teams));
    },
    DELETE_TEAM(state, id) {
      console.log(`Deleting team with id ${id}`);
      state.teams = state.teams.filter(t => t.id != id);
      localStorage.setItem('teams', JSON.stringify(state.teams));
    }
  },
  actions: {},
  modules: {}
})