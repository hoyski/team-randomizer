<template>
  <v-container>
      <v-tabs v-model="model" centered height="60px">
        <v-tab
          v-for="team in $store.state.teams"
          :key="team.id"
          :href="`#tab-${team.id}`"
        >
          {{ team.name }}
        </v-tab>
        <v-spacer/>
        <add-team/>
      </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item
        v-for="team in $store.state.teams"
        :key="team.id"
        :value="`tab-${team.id}`"
      >
        <v-card>
          <v-list elevation="4" rounded>
            <v-list-item
              v-for="(member, idx) in team.members"
              :key="idx"
              class="elevation-4"
            >
              {{ member }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    


  </v-container>
</template>

<script>
import AddTeam from './AddTeam.vue';
export default {
  name: "team-display",
  components: { 
    AddTeam 
  },
  data() {
    return {
      model: {},
      addTeamDialog: false
    };
  },
  methods: {
    addTeam() {
      alert('Adding a new team');
    }
  }
};
</script>

<style>
</style>