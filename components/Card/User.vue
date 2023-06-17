<template>
  <div class="rounded bg-white p-3 mt-3" v-if="user">
    <badge>{{ role }}</badge>
    <h3 class="mb-0 font-family-base">
      <nuxt-link :to="`/app/user/${user.id}`">{{ user.name }}</nuxt-link>
    </h3>

    <!-- <div><i class="bi bi-houses-fill"></i> {{ user.neighborhood }}</div>
    <br /> -->

    <i class="bi bi-houses-fill"></i> {{ user.neighborhood }}

    <div v-if="user.location" class="mt-3">
      <i class="bi bi-geo-alt-fill"></i>
      <a :href="`https://maps.google.com?q=${user.location.lat},${user.location.lng}`" target="_blank" class="opacity-75">
        {{ user.distance }} km <i class="bi bi-box-arrow-up-right"></i
      ></a>
    </div>
    <a :href="`mailto:${user.email}`"><i class="bi bi-envelope-fill"></i> {{ user.email }}</a> <br />
    <a :href="`tel:${user.phone}`"><i class="bi bi-telephone-fill"></i> {{ user.phone }}</a>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: [Object, Array],
      default: () => {},
    },
    role: {
      type: String,
      default: "owner",
    },
  },

  computed: {},
};
</script>

<style></style>
