<template>
  <div
    class="visual ratio"
    :class="`ratio-${ratio}`"
    :style="{ backgroundImage: data.visual ? `url(${require(`/assets/images/${data.visual}`)})` : 'none' }"
  >
    <!-- <component
      :is="data.visual ? 'img' : 'div'"
      :src="data.visual ? require(`/assets/images/${data.visual}`) : false"
      :alt="data.visual ? data.name : false"
      class="visual"
    /> -->
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

.visual {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
