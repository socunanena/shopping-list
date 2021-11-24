<template>
  <ListingItems type="category" path="/categories" :initialItems="categories" />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return {
      categories: await $axios.$get('/categories'),
    };
  },
};
</script>
