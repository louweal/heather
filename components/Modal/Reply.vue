<template>
  <div v-if="$store.state.modals.show === 'request'">Replyyy</div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.modals.data;
    },
  },
};
</script>

<style></style>
