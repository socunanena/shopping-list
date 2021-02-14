<template>
  <div>
    <ul>
      <li>
        <input type="text" v-model="newCategory" @keyup.enter="addCategory" />
      </li>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
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
      this.$axios.$post('/api/categories', category);

      this.newCategory = null;
    },
  },
  async asyncData({ $axios }) {
    return {
      categories: await $axios.$get('/api/categories'),
    };
  },
};
</script>

<style>
</style>
