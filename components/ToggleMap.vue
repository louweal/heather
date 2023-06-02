<template>
  <div class="position-fixed start-50 translate-middle bottom-0 d-md-none" style="z-index: 4">
    <div class="btn btn-primary" v-if="!$store.state.map.show" @click="$store.commit('map/toggle')">
      <i class="bi bi-geo-alt-fill"></i> Map
    </div>
    <div class="btn btn-primary" v-if="$store.state.map.show" @click="$store.commit('map/toggle')"><i class="bi bi-grid"></i> List</div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
