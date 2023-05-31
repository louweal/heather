<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div class="d-grid">
      <div class="btn btn-primary">HashPack</div>
    </div>

    <div class="" @click="$store.commit('modals/show', { name: 'register' })">Sign up</div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
