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
        <button
          class="bg-light p-2 rounded-circle lh-1 text-white"
          @click="!mine ? $store.commit('modals/show', { name: 'create', data: data }) : false"
        >
          <i class="bi" :class="mine ? 'bi-person-fill' : 'bi-chat-text-fill'"></i>
        </button>
        <div>
          <nuxt-link class="lh-1 text-white" :to="`/app/user/${data.owner}`">{{ data.name }}</nuxt-link>
          <div class="lh-sm">
            {{ data.neighborhood }} <span class="opacity-75" v-if="data.distance"> {{ data.distance }} km</span>
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
    mine() {
      return this.$store.state.user.id === this.data.owner;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  // height: max(280px, 100%);
  height: 100%;
}
</style>
