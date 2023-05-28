<template>
  <div class="ratio ratio-4x3">
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
  },
};
</script>

<style lang="scss" scoped>
div.visual {
  background-color: $light;
}
</style>
