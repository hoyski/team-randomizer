<template>
  <v-row justify="center">
    <v-dialog v-model="addTeamDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs}">
        <v-btn
          class="mx-2"
          fab
          dark
          color="green"
          v-bind="attrs"
          v-on="on"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Team</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Team name" v-model.trim="teamName" required/>
            </v-col>
            <v-col cols="12" sm="6" md="4">
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="addTeam">Add</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'add-team',
  data() {
    return {
      addTeamDialog: false,
      teamName: ""
    }
  },
  methods: {
    addTeam() {
      alert(`Adding team ${this.teamName}`);
      this.teamName = '';
      this.addTeamDialog = false;
    }
  }
}
</script>

<style>

</style>