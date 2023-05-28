<template>
  <div>
    <div id="page">
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <Header />

          <div id="pushdown" class="w-100" :class="$route.path === '/' ? 'd-none' : false"></div>
          <Nuxt />
        </div>

        <Footer v-if="$route.path !== '/app'" />
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
export default {
  transition: {
    name: "page",
    mode: "out-in",
  },
  async created() {},

  async mounted() {
    let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    let pushdown = document.querySelector("#pushdown"); // refs?
    pushdown.style.height = headerHeight + "px";
  },

  watch: {
    "$store.state.modals.disableScroll": function (val) {
      if (val) {
        // this.posY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
      }
      document.body.classList.toggle("disable-scroll");
    },
  },
};
</script>
