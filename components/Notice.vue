<template>
  <div class="notice position-fixed bottom-0 bg-primary text-white w-100 p-2">
    <div class="d-flex justify-content-between align-items-center gap-1">
      <div>
        <slot />
      </div>
      <div>
        <div class="px-2 py-1 cp" @click="$store.commit('notice/hide')">
          <i class="bi bi-x-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.position-fixed {
  z-index: 4000 !important;
}
</style>
