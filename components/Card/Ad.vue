<template>
  <div class="card overflow-hidden" v-if="data">
    <nuxt-link :to="`/app/detail/${data.id}`" class="h-100">
      <ratio-visual :data="{ visual: data.visuals ? data.visuals[0] : undefined, name: data.title }" />

      <div class="card-body">
        <h5 class="card-title">{{ data.title }}</h5>

        <p>To {{ data.type }}</p>

        <div class="vstack lh-sm">
          <span v-if="data.deposit > 0">
            <span class="fw-bold">{{ data.deposit }} hbar</span> deposit
          </span>
          <span v-if="data.rent && data.rent.start > 0">
            <span class="fw-bold">{{ data.rent.start }} hbar</span> rent, first day
          </span>
          <span v-if="data.rent && data.rent.start > 0">
            <span class="fw-bold">{{ data.rent.extra }} hbar</span> rent, each extra day
          </span>
        </div>
      </div>
    </nuxt-link>

    <div class="card-footer" v-if="data.name">
      <div class="d-flex gap-2 align-items-center">
        <button class="bg-light p-2 rounded-circle lh-1 text-white" @click="showModal()">
          <i class="bi bi-chat-text-fill"></i>
        </button>
        <div>
          <nuxt-link class="lh-1" :to="`/app/user/${data.owner}`">{{ data.name }}</nuxt-link>
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

  methods: {
    showModal() {
      if (this.$store.state.user.signedIn) {
        this.$store.commit("modals/show", { name: "request", data: this.data });
      } else {
        this.$store.commit("modals/show", { name: "connect" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
