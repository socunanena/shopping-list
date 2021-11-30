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

    <v-row>
      <v-col>
        <v-data-table
          :headers="[{ value: 'name', filterable: false }, { value: 'isChecked', filter: value => !value }, { value: 'list' }]"
          :items="productsWithLists"
          :items-per-page="-1"
          class="elevation-1"
          hide-default-header
          hide-default-footer
          mobile-breakpoint=200
          group-by="category"
          :search="list.name"
          show-select
          v-model="checkedProducts"
          @item-selected="checkProduct"
        >
          <template v-slot:item.isChecked>
          </template>
          <template v-slot:item.list>
          </template>
          <template v-slot:group.header="{ group, headers, toggle }">
            <td :colspan="headers.length" @click="toggle">
              <v-btn text plain elevation="0" class="text-subtitle-2 font-weight-bold">{{ group }}</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn color="primary" @click="clearCheckedProducts">
          Remove completed
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header color="primary lighten-5">
              Checked products
            </v-expansion-panel-header>
            <v-expansion-panel-content color="primary lighten-5">
              <v-data-table
                :headers="[{ value: 'name', filterable: false }, { value: 'isChecked', filter: value => value }, { value: 'list' }]"
                :items="productsWithLists"
                :items-per-page="-1"
                class="elevation-1"
                hide-default-header
                hide-default-footer
                mobile-breakpoint=200
                group-by="category"
                :search="list.name"
                show-select
                v-model="checkedProducts"
                @item-selected="checkProduct"
              >
                <template v-slot:item.isChecked>
                </template>
                <template v-slot:item.list>
                </template>
                <template v-slot:group.header="{ group, headers, toggle }">
                  <td :colspan="headers.length" @click="toggle">
                    <v-btn text plain elevation="0" class="text-subtitle-2 font-weight-bold">{{ group }}</v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {},
      product: {},
      checkedProducts: [],
    };
  },
  methods: {
    addProduct(product) {
      if (!this.productsWithLists.some(p => p.id === product.id && p.listId === this.list.id)) {
        this.productsWithLists.push({ ...product, list: this.list.name, listId: this.list.id });
        this.$axios.$post('/products/list', { productId: product.id, listId: this.list.id });
      }

      this.product = {};
    },
    checkProduct(product) {
      this.productsWithLists.filter(p => p.id === product.item.id).forEach(p => p.isChecked = product.value);
      this.$axios.$patch(`/products/check/${product.item.id}`, { isChecked: product.value });
    },
    clearCheckedProducts() {
      if (this.checkedProducts.length !== 0) {
        this.$axios.$put('/products/list', { products: this.checkedProducts });
        this.checkedProducts = [];
        this.productsWithLists = this.productsWithLists.filter(product => !product.isChecked);
      }
    },
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
    this.checkedProducts = this.productsWithLists.filter(p => p.isChecked);
  }
};
</script>
