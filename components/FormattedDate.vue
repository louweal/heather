<template>
  <span>
    {{ formatDate(date) }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    formatDate(date) {
      let locale = "us-EN";
      return new Date(date).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style></style>
