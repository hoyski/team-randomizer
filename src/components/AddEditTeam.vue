<template>
  <v-container class="pa-0 col-auto">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <!-- Button that activates/displays the dialog -->
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip, attrs }">
            <v-btn
              class="mx-2"
              dark
              color="green"
              v-bind="attrs"
              v-on="{ ...tooltip, ...dialog }"
            >
              <v-icon dark>{{ iconToDisplay }}</v-icon>
            </v-btn>
          </template>
          <span>{{ buttonHelpText }}</span>
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
                  <v-list-item-group>
                    <v-list-item
                      dense
                      v-for="(member, idx) in newTeam.members"
                      :key="idx"
                    >
                      <v-list-item-content>{{ member }}</v-list-item-content>
                      <v-list-item-icon>
                        <v-icon @click="deleteMember(idx)"
                          >mdi-delete-circle</v-icon
                        >
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="addUpdateTeam">{{
            adding() ? "Add" : "Update"
          }}</v-btn>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn v-if="!adding()" color="blue darken-1" text @click="deleteTeam"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirm-dialog ref="confirm" />
  </v-container>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "add-edit-team",
  components: {
    ConfirmDialog,
  },
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
  watch: {
    showDialog(value) {
      if (value) {
        console.log(`Showing add/edit team for id ${this.editTeamId}`);
        if (this.adding()) {
          // Adding new team
          this.newTeam = {
            name: "",
            members: [],
          };
        } else {
          // Deep clone the team into newTeam. Cloned so that the dialog can be cancelled
          let curTeam = this.$store.state.teams.find(
            (t) => t.id === this.editTeamId
          );
          this.newTeam = { id: curTeam.id, name: curTeam.name, members: [] };
          curTeam.members.forEach((m) => this.newTeam.members.push(m));
        }
      }
    },
  },
  methods: {
    addUpdateTeam() {
      if (this.newTeam.name.length === 0) {
        return;
      }
      this.$store.commit("ADD_UPDATE_TEAM", this.newTeam);
      this.hideDialog();
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
    deleteMember(idx) {
      //alert(`Deleting member at idx ${idx}`);
      this.newTeam.members.splice(idx, 1);
    },
    async deleteTeam() {
      if (
        await this.$refs.confirm.open(
          "Confirm",
          `
        Are you sure you want to delete team ${this.newTeam.name}?`
        )
      ) {
        this.$store.commit("DELETE_TEAM", this.newTeam.id);
        this.hideDialog();
      }
    },
    cancel() {
      this.hideDialog();
    },
    hideDialog() {
      this.showDialog = false;
    },
    validateTeamName(curVal) {
      return curVal === "" ? "Please provide a team name" : true;
    },
    adding() {
      return this.editTeamId === -1;
    },
  },
  computed: {
    iconToDisplay() {
      return this.adding() ? "mdi-plus-circle" : "mdi-cog-outline";
    },
    buttonHelpText() {
      return this.adding() ? "Add New Team" : "Edit Team";
    },
  },
  mounted() {
    console.log(`In AddEditTeam mounted with ${this.editTeamId}`);
  },
};
</script>

<style>
</style>