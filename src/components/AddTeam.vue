<template>
  <v-container class="pa-0 col-auto">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <!-- Button that activates/displays the dialog -->
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              color="green"
              v-bind="attrs"
              v-on="{ ...tooltip, ...dialog }"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>Add New Team</span>
        </v-tooltip>
      </template>
      <!-- The dialog itself -->
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
                  :rules="[validateTeamName]"
                />
                <span v-if="teamErrorText != ''" class="error">
                  {{ teamErrorText }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="24" sm="12" md="8">
                <v-text-field
                  label="Member"
                  hint="Enter a team member name and press Enter"
                  persistent-hint
                  v-model.trim="newMember"
                  @keypress.enter="addMember"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="24" sm="12" md="8">
                <v-list dense>
                  <v-subheader>Members:</v-subheader>
                  <v-list-item
                    dense
                    v-for="(member, idx) in newTeam.members"
                    :key="idx"
                  >
                    {{ member }}
                  </v-list-item>
                </v-list>
              </v-col>
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
  props: {
    editTeamId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      showDialog: false,
      newTeam: {
        name: "",
        members: [],
      },
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
      this.newTeam = {
        name: "",
        members: [],
      };
      this.showDialog = false;
    },
    validateTeamName(curVal) {
      return curVal === "" ? "Please provide a team name" : true;
    },
  },
  mounted() {
    console.log(`In AddTeam mounted with ${this.editTeamId}`);
  },
};
</script>

<style>
</style>