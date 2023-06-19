<template>
  <div
    class="notice fixed-top top-50 start-50 translate-middle xxxw-100 xxxh-100 p-2 xxxd-flex xxxjustify-content-center xxxalign-items-center"
  >
    <div class="text-center">
      <p class="mb-0">
        <span class="spinner-grow spinner-grow-sm"></span> <br />
        <!-- <span> Fetching data from Hedera </span> -->
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
  // background-color: rgba(#fff, 0.75);
  // backdrop-filter: blur(1px);
}
</style>
