<template>
  <v-container>
    <v-tabs v-model="model" centered>
      <v-tab
        v-for="team in $store.state.teams"
        :key="team.id"
        :href="`#tab-${team.id}`"
      >
        {{ team.name }}
      </v-tab>
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
export default {
  name: "team-display",
  data() {
    return {
      model: {},
    };
  },
};
</script>

<style>
</style>