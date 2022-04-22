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
                class="elevation-1 text-h2"
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
      addTeamDialog: false,
    };
  },
  methods: {
    addTeam() {
      alert("Adding a new team");
    },
    shuffleTeam(id) {
      this.$store.commit("SHUFFLE_TEAM", id);
    },
  },
};
</script>

<style>
</style>