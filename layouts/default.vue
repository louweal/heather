<template>
  <div>
    <div id="page">
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <Header />

          <div id="pushdown" class="w-100" :class="$route.path === '/' ? 'd-none' : false"></div>
          <Nuxt />
        </div>

        <Footer v-if="$route.path == '/'" />
      </div>
    </div>
    <modal name="connect" title="Connect">
      <modal-connect />
    </modal>
    <pushmenu />
    <notice v-if="$store.state.notice.active"> </notice>
  </div>
</template>

<script>
import owners from "@/data/owners";
import ads from "@/data/ads";

export default {
  owners,
  ads,

  transition: {
    name: "page",
    mode: "out-in",
  },

  async fetch() {
    this.$store.commit("data/SET_OWNERS", this.$options.owners);

    this.$store.commit("data/SET_ADS", this.$options.ads);
  },
  async mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    let pushdown = document.querySelector("#pushdown"); // refs?
    pushdown.style.height = headerHeight + "px";
  },
};
</script>
