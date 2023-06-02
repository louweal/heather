<template>
  <div class="card bg-white">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title">{{ title }}</h5>

        <p>Ask your neighbors!</p>
      </div>

      <div class="d-grid">
        <div class="btn btn-primary" @click="$store.commit('modals/show', { name: 'call', data: query })">Ask now!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => {},
    },
    title: {
      type: String,
      default: "Looking for something else?",
    },
    query: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  border: 1px dashed $primary;
  min-height: 280px;
}
</style>
