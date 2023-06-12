<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div class="d-grid">
      <div class="btn btn-primary" @click="connect()">Connect</div>
    </div>

    <!-- <br /> -->

    <!-- <div class="" @click="$store.commit('modals/show', { name: 'register' })">Sign up</div> -->
  </div>
</template>

<script>
export default {
  methods: {
    async connect() {
      console.log(process.env.USER_LOOKUP_CONTRACT);
      let userdata = await this.$store.dispatch("user/getUserData", {
        contractId: process.env.USER_LOOKUP_CONTRACT,
        accountId: process.env.MY_ACCOUNT_ID,
      });
      if (userdata) {
        this.$store.commit("user/decodeAndSetUserData", userdata);
        this.$store.commit("user/signIn");
        this.$store.commit("modals/hide");
      } else {
        // show register modal
        this.$store.commit("modals/show", { name: "register" });
      }
    },
  },
};
</script>

<style></style>
