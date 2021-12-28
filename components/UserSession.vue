<template>
  <v-card>
    <div v-if="$auth.loggedIn">
      {{ $auth.user.name }}
      <v-btn text>Logout</v-btn>
    </div>
    <div v-else>

    </div>













    <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <v-btn @click="onSignIn"></v-btn>
    <v-btn @click="signOut"></v-btn> -->
  </v-card>
</template>


<script>
export default {
  methods: {
    // loginWithGoogle(){
    //   this.$auth.loginWith('google').then(th => console.log('TRALARA'));
    // },
  },
  mounted() {
    // console.log('MOUNTED', this.$auth);
  }
};












// function onSignIn() {
//   console.log('function lalala ')
// }

//   function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }

// export default {
//   methods: {
//     onSignIn() {
//       console.log('lalalalaal')
//       const U = googleUser.getBasicProfile();
//       console.log({U})
//     },
//     signOut() {
//       var auth2 = gapi.auth2.getAuthInstance();
//       auth2.signOut().then(function () {
//         console.log('User signed out.');
//       }).catch(error => console.log({error}));
//     },
//   },
// };
</script>
