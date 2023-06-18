<template>
  <div class="notice fixed-top w-100 h-100 p-2 d-flex justify-content-center align-items-center">
    <div class="text-center">
      <p class="mb-0">
        <span class="spinner-grow spinner-grow-sm"></span> <br />
        <span> Fetching data from Hedera </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notice {
  z-index: 4000 !important;
  background-color: rgba(#ddd, 0.5);
  backdrop-filter: blur(1px);
}
</style>
