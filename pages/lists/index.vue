<template>
  <div>
    <ul>
      <li>
        <input type="text" v-model="newList" @keyup.enter="addList" />
      </li>
      <li v-for="list in lists" :key="list.id">
        {{ list.name }}
        <button @click="deleteList(list.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newList: null,
    };
  },
  methods: {
    addList() {
      if (!this.newList) {
        return;
      }

      const list = {
        id: Math.ceil((Math.random() * 1000000)),
        name: this.newList,
      };

      this.lists.push(list);
      this.$axios.$post('/lists', list);

      this.newList = null;
    },
    deleteList(id) {
      this.lists = this.lists.filter(list => list.id !== id);
      this.$axios.$delete(`/lists/${id}`);
    },
  },
  async asyncData({ $axios }) {
    return {
      lists: await $axios.$get('/lists'),
    };
  },
};
</script>

<style>
</style>
