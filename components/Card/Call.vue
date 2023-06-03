<template>
  <div class="card bg-primary text-white">
    <div class="card-body">
      <h5 class="card-title text-white">{{ data.title }}</h5>

      <p>
        {{ data.description }}
      </p>
    </div>

    <div class="card-footer" v-if="data.name">
      <div class="d-flex gap-2 align-items-center">
        <button class="bg-light p-2 rounded-circle lh-1 text-white" @click="$store.commit('modals/show', { name: 'create', data: data })">
          <i class="bi bi-chat-text-fill"></i>
        </button>
        <div>
          <div class="lh-1">{{ data.name }}</div>
          <div class="lh-sm">
            {{ data.neighborhood }} <span class="opacity-75 fw-medium" v-if="data.distance && place"> {{ data.distance }} km</span>
          </div>
        </div>
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
  },

  computed: {
    place() {
      return this.$store.state.search.place;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
