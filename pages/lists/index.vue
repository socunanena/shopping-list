<template>
  <ListingItems type="list" path="/lists" :initialItems="lists" />
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return {
      lists: await $axios.$get('/lists'),
    };
  },
};
</script>
