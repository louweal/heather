<template>
  <div
    :class="markerInfo.show ? 'marker-info--active' : false"
    class="card shadow-sm marker-info position-absolute start-50 translate-middle-x top-0"
    style="z-index: 5; margin-top: 100px"
  >
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <nuxt-link :to="'/app/detail/' + markerInfo.id">
          <h3 class="mb-0 fs-5 mb-0 font-family-base">{{ infoTitle }}</h3>
        </nuxt-link>

        <button class="bg-light rounded rounded-circle p-1 lh-1" @click="hideInfo()">
          <i class="bi bi-x"></i>
        </button>
      </div>

      <template v-if="markerInfo.type === 'rent' || markerInfo.type === 'borrow'">
        <p v-if="markerInfo.available">
          To {{ markerInfo.type }}

          <span v-if="markerInfo.type === 'rent' && markerInfo.rent" class="opacity-50">€{{ markerInfo.rent.start }}</span>
        </p>
        <p v-else>Not available</p>
      </template>

      <p v-if="markerInfo.type === 'call'">{{ markerInfo.description.slice(0, 60) }}...</p>
    </div>
    <div class="card-footer" v-if="markerInfo.type !== 'user'">
      <div class="d-flex gap-2 align-items-center">
        <button
          class="bg-light p-2 rounded-circle lh-1 text-white"
          @click="$store.commit('modals/show', { name: modalName, data: markerInfo })"
        >
          <i class="bi bi-chat-text-fill"></i>
        </button>
        <div>{{ markerInfo.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    markerInfo: {
      type: [Array, Object],
      default: () => {
        show: false;
      },
    },
  },

  computed: {
    infoTitle() {
      return this.markerInfo.type === "user" ? this.markerInfo.name : this.markerInfo.title;
    },

    modalName() {
      return this.markerInfo.type === "call" ? "create" : "request";
    },
  },

  methods: {
    hideInfo() {
      this.markerInfo.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.marker-info {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s cubic-bezier(0.2, 0, 0.2, 1);
  min-width: 270px;
  max-width: 300px;
  // min-height: 100px;

  &--active {
    opacity: 1 !important;
    visibility: visible;
  }
}
</style>