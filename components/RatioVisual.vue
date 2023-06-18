<template>
  <div class="visual ratio bg-light" :class="`ratio-${ratio}`" :style="{ backgroundImage: data.visual ? visual : 'none' }"></div>
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

  computed: {
    visual() {
      try {
        return `url(${require(`/assets/images/${data.visual}`)})`;
      } catch (error) {
        return "none";
      }
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
