<template>
  <v-container>
    <v-tabs v-model="model" grow show-arrows height="60px">
      <v-tab
        v-for="team in $store.state.teams"
        :key="team.id"
        :href="`#tab-${team.id}`"
      >
        {{ team.name }}
      </v-tab>
      <v-spacer />
      <add-edit-team />
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item
        v-for="team in $store.state.teams"
        :key="team.id"
        :value="`tab-${team.id}`"
      >
        <v-container>
          <v-row>
            <v-spacer cols="12" />
            <v-col>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    dark
                    color="green"
                    v-on="on"
                    v-bind="attrs"
                    @click="shuffleTeam(team.id)"
                  >
                    <v-icon>mdi-shuffle</v-icon>
                  </v-btn>
                </template>
                <span>Shuffle Team Members</span>
              </v-tooltip>
            </v-col>
            <v-col col-auto><add-edit-team :editTeamId="team.id" /></v-col>
          </v-row>
          <v-list>
            <v-list-item-group elevation="1" rounded>
              <v-list-item
                v-for="(member, idx) in team.members"
                :key="idx"
                class="elevation-1 text-h2 teamMember"
                :class="'team-' + team.id"
              >
                <v-list-item-content>{{ member }}</v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import AddEditTeam from "./AddEditTeam.vue";
export default {
  name: "team-display",
  components: {
    AddEditTeam,
  },
  data() {
    return {
      model: {},
      height: 0,
    };
  },
  methods: {
    // Shuffle the list items by using CSS transform translateY directives. A transition is
    // applied to the transforms to animate the shuffling
    shuffleTeam(id) {
      let memberDivs = document.querySelectorAll(`.teamMember.team-${id}`);
      console.log(`Retrieved ${memberDivs.length} divs`);

      if (this.height === 0 && memberDivs.length > 1) {
        this.height =
          memberDivs[1].getBoundingClientRect().top -
          memberDivs[0].getBoundingClientRect().top;
      }

      // Make a deep copy of the members array and shuffle it
      let membersCopy = [];
      let team = this.$store.state.teams.find((t) => t.id === id);
      team.members.forEach((m) => membersCopy.push(m));
      for (let i = membersCopy.length * 3; i > 0; i--) {
        const from = Math.floor(Math.random() * membersCopy.length);
        const to = Math.floor(Math.random() * membersCopy.length);
        [membersCopy[from], membersCopy[to]] = [membersCopy[to], membersCopy[from]];
      }

      // Figure out how many positions and in which direction each member
      // has moved and translate the Y axis accordingly
      for (let i = 0; i < memberDivs.length; ++i) {
        let shufIdx = membersCopy.findIndex(
          (m) => m === memberDivs[i].innerText
        );
        let transYDist = (shufIdx - i) * this.height;
        memberDivs[i].style.transform = `translateY(${transYDist}px)`;
      }

      // Update the store to match the new order
      // team.members = membersCopy;
      // this.$store.commit("ADD_UPDATE_TEAM", team);
    },
  },
};
</script>

<style scoped>
.teamMember {
  transition: transform 0.75s;
}
</style>