<template>
  <div v-if="$store.state.modals.show === 'updateAd'">
    <p>Available soon</p>
  </div>
</template>

<script>
const { updateAd } = require("@/utils/storage/ads.js");

export default {};
</script>

<style></style>
