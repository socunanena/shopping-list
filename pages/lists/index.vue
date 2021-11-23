<template>
  <div>
    <v-data-table
      :headers="[{ value: 'name' }, { value: 'actions' }]"
      :items="lists"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      mobile-breakpoint=200
    >
      <template v-slot:top>
        <v-text-field
          type="text"
          label="New list"
          class="px-4 pt-4"
          v-model="newList"
          append-icon="mdi-send"
          @click:append="addList"
          @keyup.enter="addList"
          color="primary"
          outlined
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end">
          <v-icon @click="openDialog(item)">mdi-delete</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-text>Do you want to delete <span class="font-weight-bold">{{ listToDelete && listToDelete.name }}</span> list?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeDialog">No</v-btn>
          <v-btn text color="primary" @click="deleteList">Yes</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newList: null,
      listToDelete: null,
      dialog: false,
    };
  },
  methods: {
    addList() {
      if (!this.newList) {
        return;
      }

      const list = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newList,
      };

      this.lists.push(list);
      this.$axios.$post('/lists', list);

      this.newList = null;
    },
    deleteList() {
      this.lists = this.lists.filter(list => list.id !== this.listToDelete.id);
      this.$axios.$delete(`/lists/${this.listToDelete.id}`);
      this.closeDialog();
    },
    openDialog(list) {
      this.dialog = true;
      this.listToDelete = list;
    },
    closeDialog() {
      this.dialog = false;
      this.listToDelete = null;
    },
  },
  async asyncData({ $axios }) {
    return {
      lists: await $axios.$get('/lists'),
    };
  },
};
</script>

<style>
</style>
