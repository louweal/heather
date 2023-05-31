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

    <modal name="register" title="Welcome to Heather!">
      <modal-register />
    </modal>

    <modal name="request" title="Send request">
      <modal-request />
    </modal>

    <modal name="create" title="Add item">
      <modal-create />
    </modal>

    <modal name="call" title="Place a call">
      <modal-call />
    </modal>
    <pushmenu />
    <notice v-if="$store.state.notice.active"> </notice>
  </div>
</template>

<script>
import owners from "@/data/owners";
import ads from "@/data/ads";
import calls from "@/data/calls";

export default {
  owners,
  ads,
  calls,

  transition: {
    name: "page",
    mode: "out-in",
  },

  async fetch() {
    this.$store.commit("data/SET_OWNERS", this.$options.owners);

    this.$store.commit("data/SET_ADS", this.$options.ads);
    this.$store.commit("data/SET_CALLS", this.$options.calls);
    this.$store.commit("data/SET_BOTH"); // combine ads and calls
  },

  async mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    let pushdown = document.querySelector("#pushdown"); // refs?
    pushdown.style.height = headerHeight + "px";
  },
};
</script>
