<template>
  <div class="spinner fixed-top w-100 h-100" :class="$store.state.hedera.awaiting ? 'spinner--active' : false">
    <div class="spinner-border" role="status">
      <!-- <span class="visually-hidden">Loading...</span> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner {
  z-index: 5000 !important;
  background-color: rgba(222, 222, 222, 0.4);
  opacity: 0;
  visibility: hidden;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;

  &--active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
