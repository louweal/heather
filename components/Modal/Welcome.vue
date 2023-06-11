<template>
  <div v-if="$store.state.modals.show === 'welcome'" class="text-center">
    <p>Your account was succesfully created.</p>

    <button class="btn btn-primary" @click="discover()">Discover your neighborhood</button>
  </div>
</template>

<script>
export default {
  methods: {
    discover() {
      this.$router.push("/app");
      this.$store.commit("modals/hide");
    },
  },
};
</script>

<style></style>
