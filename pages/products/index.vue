<template>
  <div>
    <ul>
      <li>
        <select v-model="newProduct.category">
          <option v-for="category in categories" :key="category.id" v-bind:value="{ id: category.id, name: category.name }">{{ category.name }}</option>
        </select>
        <input type="text" v-model="newProduct.name" @keyup.enter="addProduct" />
      </li>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
        {{ product.category }}
        <button @click="deleteProduct(product.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: null,
        category: null,
      },
    };
  },
  methods: {
    addProduct() {
      if (!this.newProduct.name) {
        return;
      }

      const product = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newProduct.name,
      };

      this.products.push({ ...product, category: this.newProduct.category.name });
      this.$axios.$post('/products', { ...product, categoryId: this.newProduct.category.id });

      this.newProduct.name = null;
      this.newProduct.category = null;
    },
    deleteProduct(id) {
      this.products = this.products.filter(product => product.id !== id);
      this.$axios.$delete(`/products/${id}`);
    },
  },
  async asyncData({ $axios }) {
    return {
      products: await $axios.$get('/products'),
      categories: await $axios.$get('/categories'),
    };
  },
};
</script>

<style>
</style>
