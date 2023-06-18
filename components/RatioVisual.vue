<template>
  <div
    class="visual ratio bg-light"
    :class="`ratio-${ratio}`"
    :style="{ backgroundImage: data.visual ? `url(${require(`/assets/images/${data.visual}`)})` : 'none' }"
  ></div>
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
.visual {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
