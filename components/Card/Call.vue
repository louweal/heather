<template>
  <div class="card bg-secondary text-white">
    <div class="card-body">
      <h5 class="card-title text-white">Party tent</h5>

      <p>
        Hi, I'm looking to borrow or rent a party tent on the 24th of July because I'm giving a birthday party. Lorem uipsum to get 140
        characters.
      </p>
    </div>

    <div class="card-footer">
      <div class="d-flex gap-2 align-items-center">
        <div class="bg-light p-1 px-2 rounded-circle">A</div>
        <div>
          <div class="lh-1">Anneloes</div>
          <div class="lh-sm">Leiden <span class="opacity-50">1.7km</span></div>
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
