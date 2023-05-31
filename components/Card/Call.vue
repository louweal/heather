<template>
  <div class="card bg-secondary text-white">
    <div class="card-body">
      <h5 class="card-title text-white">{{ data.title }}</h5>

      <p>
        {{ data.description }}
      </p>
    </div>

    <div class="card-footer">
      <div class="d-flex gap-2 align-items-center">
        <button class="bg-light p-2 rounded-circle lh-1 text-white" @click="$store.commit('modals/show', { name: 'reply', data: data })">
          <i class="bi bi-chat-text-fill"></i>
        </button>
        <div>
          <div class="lh-1">{{ data.name }}</div>
          <div class="lh-sm">
            {{ data.location.public }} <span class="text-muted fw-medium" v-if="data.distance"> {{ data.distance }} km</span>
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
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
