<template>
  <v-app>
    <Header />

    <v-main class="primary lighten-5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: { Header },
};
</script>
