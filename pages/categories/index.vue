<template>
  <div>
    <ul>
      <li>
        <input type="text" v-model="newCategory" @keyup.enter="addCategory" />
      </li>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <button @click="deleteCategory(category.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCategory: null,
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
    deleteCategory(id) {
      this.categories = this.categories.filter(category => category.id !== id);
      this.$axios.$delete(`/categories/${id}`);
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
