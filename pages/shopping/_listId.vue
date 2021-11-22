<template>
  <div>
    <ul>
      <li>
        <select v-model="listId" @change="$router.push({ name: 'shopping-listId', params: { listId } })">
          <option v-for="list in lists" :key="list.id" :value="list.id">{{ list.name }}</option>
        </select>
        <select v-model="product" @change="addProductToList">
          <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
        </select>
      </li>
      <li v-for="product in productsByList" :key="product.id" :class="product.isChecked">
        {{ product.name }}
        {{ product.category }}
        <input type="checkbox" v-model="product.isChecked" @click="toggleProduct(product)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listId: null,
      product: null,
    };
  },
  methods: {
    addProductToList() {
      if (!this.listId || !this.product) {
        return;
      }

      !this.productsByList.some(product => product.id === this.product.id) && this.productsByList.push(this.product);
      this.$axios.$post('/products/list', { listId: this.listId, productId: this.product.id });

      this.product = null;
    },
    toggleProduct(product) {
      product.isChecked = !product.isChecked;
      this.$axios.$patch(`/products/check/${product.id}`, { isChecked: product.isChecked });
    },
  },
  async asyncData({ params, $axios }) {
    const { listId } = params;
    return {
      listId,
      lists: await $axios.$get('/lists'),
      products: await $axios.$get(`/products`),
      productsByList: await $axios.$get(`/products/list/${listId}`),
    };
  },
};
</script>

<style>
</style>
