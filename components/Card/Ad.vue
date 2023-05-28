<template>
  <div class="card overflow-hidden">
    <visual :data="{ visual: require('~/assets/images/dummy-drill.png'), name: 'Drill' }" />
    <!-- <img src="..." class="card-img-top" alt="..." /> -->
    <div class="card-body">
      <h5 class="card-title">Drill</h5>
    </div>

    <div class="card-footer">
      <div class="d-flex gap-2 align-items-center">
        <div class="bg-light p-1 px-2 rounded-circle">A</div>
        <div>
          <div class="lh-1">Anneloes</div>
          <div class="lh-sm">Leiden <span class="text-muted fw-medium">1.7km</span></div>
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
