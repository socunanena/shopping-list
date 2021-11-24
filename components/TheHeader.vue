<template>
  <div>
    <v-navigation-drawer app temporary v-model="drawer" color="primary lighten-3">
      <v-list>
        <v-list-item-group color="primary darken-4">
          <v-list-item v-for="page in pages" :key="page.title" :to="page.link">
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ page.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title>
        TITLE
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="page in pages" :key="page.title" :to="page.link">
          <v-icon left>{{ page.icon }}</v-icon>
          {{ page.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      pages: [
        { title: 'Categories', link: '/categories', icon: 'mdi-sitemap-outline' },
        { title: 'Lists', link: '/lists', icon: 'mdi-playlist-edit' },
        { title: 'Products', link: '/products', icon: 'mdi-fruit-cherries' },
        { title: 'Shopping', link: '/', icon: 'mdi-shopping-outline' },
      ],
    };
  },
};
</script>
