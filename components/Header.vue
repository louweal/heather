<template>
  <nav class="header fixed-top p-2" id="header" ref="header">
    <div class="row">
      <div class="col col-md-4 d-flex align-items-center">
        <nuxt-link to="/" event="" @click.native="scrollToTop()" class="header-logo" aria-label="to homepage">
          <div class="logo"></div>
        </nuxt-link>
      </div>
      <div class="col-6 col-md-4">
        <div class="searchbar" @click="activateSearch()">
          <input type="text" class="form-control" placeholder="What are you looking for?" />
        </div>
      </div>
      <div class="col col-md-4 d-flex justify-content-end align-items-center">
        <div class="btn btn-primary d-none d-lg-block" @click="$store.commit('modals/show', { name: 'connect' })">Sign in / Register</div>
        <div class="d-lg-none" @click="$store.commit('pushmenu/toggle')">
          <i class="bi lh-1" style="font-size: 38px" :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"></i>
        </div>
      </div>
    </div>

    <div class="searchform fixed-top start-50 translate-middle-x bg-white p-2" :class="searchActive ? 'active' : false">
      <div class="hstack gap-1">
        <input type="text" class="form-control" @click="activateSearch()" placeholder="Find something..." id="query" />
        <input type="text" class="form-control" placeholder="Address" />
        <div class="btn btn-primary rounded" @click="searchActive = false">
          <i class="bi bi-search"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      prevPosY: 0,
      searchActive: false,
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

    activateSearch() {
      this.searchActive = true;

      let field = document.getElementById("query"); //this.$refs["query"]; // document.getElementById("query");

      window.setTimeout(() => field.focus(), 0);

      console.log("heh!");
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
    width: 94px * 1.4;
    height: 20px * 1.4;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0.1, 1);

    &:hover {
      opacity: 1;
    }
  }
}

.searchbar {
  position: relative;
  &:not(.active)::after {
    content: "\F52A";
    position: absolute;
    right: 1rem;
    top: 0.7rem;
    display: inline-block;
    font-family: bootstrap-icons !important;
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -0.125em;
    -webkit-font-smoothing: antialiased;
    font-size: 1.75rem;
    color: $primary;
    transform: scaleX(-1);
  }
}

.btn-search {
  i {
    &::before {
      transform: scaleX(-1);
      font-size: 1.5rem;
    }
  }
}

.active {
  opacity: 1 !important;
  visibility: visible !important;
}

.searchform {
  width: 100vw;
  opacity: 0.2;
  visibility: hidden;
  transition: opacity 0.9s 0.1s cubic-bezier(0.2, 0, 0.1, 1);

  @include media-breakpoint-up(lg) {
    width: auto;
  }
}
</style>
