<template>
  <div>
   <v-data-table
      :headers="[{ value: 'name' }, { value: 'actions' }]"
      :items="items"
      :items-per-page="-1"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      mobile-breakpoint=200
      group-by="category"
    >
      <template v-slot:top>
        <v-row class="px-4 pt-4">
          <v-col cols=12 sm=4 v-if="type === 'product'">
            <v-select
              v-model="newItem.category"
              label="Category"
              :items="categories"
              item-text="name"
              item-value="id"
              outlined
              return-object
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              type="text"
              v-model="newItem.name"
              :label="`New ${type}`"
              append-icon="mdi-send"
              @click:append="addItem"
              @keyup.enter="addItem"
              color="primary"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end">
          <v-icon @click="openDialog(item)">mdi-delete</v-icon>
        </div>
      </template>
      <template v-slot:group.header="{ group, headers, toggle }">
        <td :colspan="headers.length" @click="toggle" v-if="type === 'product'">
          <v-btn text plain elevation="0" class="text-subtitle-2 font-weight-bold">{{ group }}</v-btn>
        </td>
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
      newItem: {},
      itemToDelete: null,
      dialog: false,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    initialItems: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  methods: {
    addItem() {
      if (!this.newItem.name) {
        return;
      }

      const item = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newItem.name,
        categoryId: this.newItem.category?.id,
        category: this.newItem.category?.name,
      };

      this.items.push(item);
      this.$axios.$post(this.path, item);

      this.newItem = {};
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
