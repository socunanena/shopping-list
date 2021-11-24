<template>
  <ListingItems type="product" path="/products" :initialItems="products" :categories="categories" />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return {
      products: await $axios.$get('/products'),
      categories: await $axios.$get('/categories'),
    };
  },
};
</script>
