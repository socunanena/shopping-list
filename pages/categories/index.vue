<template>
  <ListingItems type="category" path="/categories" :items="categories" />
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
