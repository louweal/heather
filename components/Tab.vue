<template>
  <li class="nav-item">
    <button class="nav-link" @click="$store.commit('tabs/switch', name)" :class="$store.state.tabs.name === name ? 'active' : false">
      {{ name }} <number-badge v-if="num > 0" class="ms-1">{{ num }}</number-badge>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "tab",
    },
    num: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
