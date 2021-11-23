<template>
  <div>
    <v-data-table
      :headers="[{ value: 'name' }, { value: 'actions' }]"
      :items="categories"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      mobile-breakpoint=200
    >
      <template v-slot:top>
        <v-text-field
          type="text"
          label="New category"
          class="px-4 pt-4"
          v-model="newCategory"
          append-icon="mdi-send"
          @click:append="addCategory"
          @keyup.enter="addCategory"
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
        <v-card-text>Do you want to delete <span class="font-weight-bold">{{ categoryToDelete && categoryToDelete.name }}</span> category?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeDialog">No</v-btn>
          <v-btn text color="primary" @click="deleteCategory">Yes</v-btn>
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
      newCategory: null,
      categoryToDelete: null,
      dialog: false,
    };
  },
  methods: {
    addCategory() {
      if (!this.newCategory) {
        return;
      }

      const category = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newCategory,
      };

      this.categories.push(category);
      this.$axios.$post('/categories', category);

      this.newCategory = null;
    },
    deleteCategory() {
      this.categories = this.categories.filter(category => category.id !== this.categoryToDelete.id);
      this.$axios.$delete(`/categories/${this.categoryToDelete.id}`);
      this.closeDialog();
    },
    openDialog(category) {
      this.dialog = true;
      this.categoryToDelete = category;
    },
    closeDialog() {
      this.dialog = false;
      this.categoryToDelete = null;
    },
  },
  async asyncData({ $axios }) {
    return {
      categories: await $axios.$get('/categories'),
    };
  },
};
</script>

<style>
</style>
