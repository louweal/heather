<template>
  <nav class="header fixed-top p-2" id="header" ref="header">
    <div class="d-flex justify-content-between align-items-center">
      <nuxt-link to="/" event="" @click.native="scrollToTop()" class="header-logo me-4" aria-label="to homepage">
        <div class="logo"></div>
      </nuxt-link>
      <nuxt-link to="/app">App</nuxt-link>

      <div class="ms-auto d-none d-lg-flex align-items-center gap-2 gap-md-4">
        <div class="btn btn-primary">Sign in / Register</div>
      </div>
      <div class="d-lg-none" @click="$store.commit('pushmenu/toggle')">
        <i class="bi lh-1" style="font-size: 38px" :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      prevPosY: 0,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.aosHeader);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.aosHeader);
  },

  computed: {},

  methods: {
    scrollToTop() {
      if (this.$route.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
        this.$router.push("/");
      }
    },
    aosHeader() {
      let header = this.$refs["header"];
      let headerHeight = header.offsetHeight;

      // make header transparent only on top of hero on homepage
      if (this.$route.path === "/" && window.scrollY <= window.innerHeight - headerHeight) {
        header.classList.add("header--transparent");
        header.classList.remove("header--white");
      } else {
        header.classList.add("header--white");
        header.classList.remove("header--transparent");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(#000, 0.075);
  border-bottom: 1px solid rgba(#000, 0.175);

  .logo {
    background-image: url("@/assets/images/logo.svg");
    width: 135px;
    height: 45px;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0.1, 1);

    &:hover {
      opacity: 1;
    }
  }
}
</style>
