<template>
  <li class="nav-item">
    <button class="nav-link" @click="$store.commit('tabs/switch', name)" :class="$store.state.tabs.name === name ? 'active' : false">
      {{ name }} <badge v-if="num > 0">{{ num }}</badge>
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
