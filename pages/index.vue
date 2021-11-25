<template>
  <div>
    <v-row class="mt-0">
      <v-col cols=12 sm=4>
        <v-select
          v-model="list"
          label="List"
          :items="lists"
          item-text="name"
          return-object
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="product"
          label="Product"
          :items="products"
          :item-text="({ name, category }) => `${name} [${category}]`"
          return-object
          @input="addProduct"
          outlined
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-data-table
      :headers="[{ value: 'name', filterable: false }, { value: 'list' }]"
      :items="productsWithLists"
      :items-per-page="-1"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      item-key="name + list"
      mobile-breakpoint=200
      group-by="category"
      :search="list.name"
    >
      <template v-slot:item.list>
      </template>
      <template v-slot:group.header="{ group, headers, toggle }">
        <td :colspan="headers.length" @click="toggle">
          <v-btn text plain elevation="0" class="text-subtitle-2 font-weight-bold">{{ group }}</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {},
      product: {},
    };
  },
  methods: {
    addProduct(product) {
      if (!this.productsWithLists.some(p => p.id === product.id && p.listId === this.list.id)) {
        this.productsWithLists.push({ ...product, list: this.list.name });
        this.$axios.$post('/products/list', { productId: product.id, listId: this.list.id });
      }

      this.product = {};
    }
  },
  async asyncData({ $axios }) {
    return {
      lists: await $axios.$get('/lists'),
      products: await $axios.$get(`/products`),
      productsWithLists: await $axios.$get('/products/list'),
    };
  },
  created() {
    this.list = this.lists[0];
  }
};
</script>
