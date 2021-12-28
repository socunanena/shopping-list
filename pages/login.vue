<template>
  <v-card>
    <v-btn @click="loginWithGoogle()" icon-left="mdi-google">
      Sign in with Google
    </v-btn>
  </v-card>
</template>

<script>
export default {
  methods: {
    loginWithGoogle(){
      this.$auth.loginWith('google');
    },
  },
};
</script>
