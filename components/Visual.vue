<template>
  <div class="test d-grid justify-content-center">
    <img
      :src="data.visual ? require(`/assets/images/${data.visual}`) : false"
      :alt="data.visual ? data.name : false"
      class="visual rounded"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
    ratio: {
      type: String,
      default: "4x3",
    },
  },
};
</script>

<style lang="scss" scoped>
div.visual {
  background-color: $light;
}

.test {
  height: min(100%, 89vh) !important;
  max-height: 89vh !important;
  max-width: 100% !important;
}

.visual {
  max-width: 100% !important;
  // min-height: min(100%, 89vh);
  max-height: min(100%, 89vh);
  object-fit: cover;

  @include media-breakpoint-up(xxl) {
    // min-height: 89vh !important;
    min-height: 89vh;
  }
}
</style>
