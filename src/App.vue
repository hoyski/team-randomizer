<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Team Randomizer
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/hoyski/team-randomizer"
        target="_blank"
        text
      >
        <span class="mr-2">View Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <team-display />
    </v-main>
  </v-app>
</template>

<script>
import TeamDisplay from "./components/TeamDisplay.vue";

export default {
  name: "App",
  components: { TeamDisplay },
  data: () => ({
    //
  }),
};
</script>
