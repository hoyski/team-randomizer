<template>
  <v-container class="pa-0 col-auto">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2" fab dark color="green" v-bind="attrs" v-on="on">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Team</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="24" sm="12" md="8">
                <v-text-field
                  label="Team name"
                  v-model.trim="newTeam.name"
                  required
                />
                <span v-if="errorText != ''" class="error">
                  {{ teamErrorText }}
                </span>
              </v-col>
            </v-row>
            <v-row cols="24" sm="12" md="8">
              <v-text-field
                label="Member"
                v-model.trim="newMember"
                @keypress.enter="addMember"
              />
            </v-row>
            <v-row
              cols="24"
              sm="12"
              md="8"
              v-for="(member, idx) in newTeam.members"
              :key="idx"
            >
              {{ member }}
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="addTeam">Add</v-btn>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "add-team",
  data() {
    return {
      showDialog: false,
      newTeam: {},
      newMember: "",
      teamErrorText: "",
    };
  },
  methods: {
    addTeam() {
      if (this.newTeam.name.length === 0) {
        this.errorText = "Team Name is required";
        return;
      }
      this.$store.commit("ADD_TEAM", this.newTeam);
      this.clearTeamAndHide();
    },
    addMember() {
      if (this.newMember != "") {
        if (this.newTeam.members === undefined) {
          this.newTeam.members = [];
        }
        this.newTeam.members.push(this.newMember);
        this.newMember = "";
      }
    },
    cancel() {
      this.clearTeamAndHide();
    },
    clearTeamAndHide() {
      this.newTeam = {};
      this.showDialog = false;
    },
  },
};
</script>

<style>
</style>