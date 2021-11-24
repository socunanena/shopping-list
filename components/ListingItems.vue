<template>
  <div>
   <v-data-table
      :headers="[{ value: 'name' }, { value: 'actions' }]"
      :items="items"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      mobile-breakpoint=200
    >
      <template v-slot:top>
        <v-text-field
          type="text"
          :label="`New ${type}`"
          class="px-4 pt-4"
          v-model="newItem"
          append-icon="mdi-send"
          @click:append="addItem"
          @keyup.enter="addItem"
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
        <v-card-text>Do you want to delete <span class="font-weight-bold">{{ itemToDelete && itemToDelete.name }}</span>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeDialog">No</v-btn>
          <v-btn text color="primary" @click="deleteItem">Yes</v-btn>
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
      items: this.initialItems,
      newItem: null,
      itemToDelete: null,
      dialog: false,
    };
  },
  props: [
    'type',
    'path',
    'initialItems',
  ],
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }

      const item = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newItem,
      };

      this.items.push(item);
      this.$axios.$post(this.path, item);

      this.newItem = null;
    },
    deleteItem() {
      this.items = this.items.filter(item => item.id !== this.itemToDelete.id);
      this.$axios.$delete(`${this.path}/${this.itemToDelete.id}`);
      this.closeDialog();
    },
    openDialog(item) {
      this.dialog = true;
      this.itemToDelete = item;
    },
    closeDialog() {
      this.dialog = false;
      this.itemToDelete = null;
    },
  },
};
</script>
