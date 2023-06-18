<template>
  <div v-if="$store.state.modals.show === 'welcome'" class="text-center">
    <p>Your account was succesfully created.</p>

    <div class="d-grid">
      <button class="btn btn-primary" @click="$store.commit('modals/show', { name: 'connect' })">Sign in</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // discover() {
    //   this.$router.push("/app");
    //   this.$store.commit("modals/hide");
    // },
  },
};
</script>

<style></style>
