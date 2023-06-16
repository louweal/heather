<template>
  <nuxt-link class="btn mb-4" :to="link">
    <i class="bi bi-arrow-left text-primary fs-2"></i>
  </nuxt-link>
</template>

<script>
export default {
  // created() {
  //   console.log(this.$nuxt.context.from);
  // },

  computed: {
    link() {
      return `/app/detail/${this.$route.params.id}/${this.$route.params.rid}`;
    },
  },
};
</script>

<style></style>
