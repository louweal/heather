<template>
  <div class="ratio" :class="`ratio-${ratio}`">
    <component :is="data.visual ? 'img' : 'div'" :src="data.visual || false" :alt="data.visual ? data.name : false" class="visual" />
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
</style>
