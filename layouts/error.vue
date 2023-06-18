<template>
  <div class="container-xl">
    <div class="text-center">
      <h1 class="text-primary fs-2 pb-3">{{ error ? $t(error.message) : $t("Something went wrong") }}.</h1>

      <button class="btn btn-primary" v-if="this.error.statusCode === 403" @click="$store.commit('modals/show', { name: 'connect' })">
        Connect wallet
      </button>
      <nuxt-link v-else to="/" class="btn btn-primary">
        {{ $t("Return home") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    "$store.state.user.signedIn": function () {
      if (this.$store.state.user.signedIn && this.error.statusCode === 403) {
        this.$router.push({ path: this.$route.path, hash: "#" + new Date().getTime() });
      }
    },
  },
};
</script>
