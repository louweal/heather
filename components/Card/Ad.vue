<template>
  <div class="card overflow-hidden" v-if="data">
    <visual :data="{ visual: require(`/assets/images/${data.visuals[0]}`), name: data.title }" />
    <nuxt-link :to="`/app/detail/${data.id}`" class="card-body">
      <h5 class="card-title">{{ data.title }}</h5>

      <p v-if="data.available">
        To {{ data.type }}

        <span v-if="data.type === 'rent' && data.rent" class="opacity-50">€{{ data.rent.start }}</span>
      </p>
      <p v-else>Not available</p>
    </nuxt-link>

    <div class="card-footer">
      <div class="d-flex gap-2 align-items-center">
        <button class="bg-light p-2 rounded-circle lh-1 text-white" @click="$store.commit('modals/show', { name: 'request', data: data })">
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
