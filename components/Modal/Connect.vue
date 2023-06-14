<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div class="d-grid gap-2">
      <div class="btn btn-primary" @click="connectHashpack()">Connect using HashPack</div>

      <div class="text-center" @click="connect()">or connect using a demo wallet</div>
    </div>
  </div>
</template>

<script>
const { getUserData } = require("@/utils/storage/users.js");

export default {
  methods: {
    async connect() {
      let userdata = await getUserData(process.env.MY_ACCOUNT_ID); // todo hashpack option
      if (userdata) {
        this.$store.commit("user/setUserData", userdata);
        this.$store.commit("user/signIn");
        this.$store.commit("modals/hide");
      } else {
        // show register modal
        this.$store.commit("modals/show", { name: "register" });
      }
    },

    async connectHashPack() {
      console.log("todo connect hashpack");
    },
  },
};
</script>

<style></style>
