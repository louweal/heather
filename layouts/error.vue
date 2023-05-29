<template>
  <main>
    <div class="container-xl mt-4">
      <div class="text-center">
        <h1 class="text-secondary fs-2 pb-3">{{ error ? $t(error.message) : $t("Something went wrong") }}.</h1>

        <nuxt-link to="/" class="btn btn-secondary">
          {{ $t("Return home") }}
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
