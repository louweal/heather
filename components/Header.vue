<template>
  <nav class="header fixed-top p-2 shadow-sm" id="header" ref="header">
    <div class="row g-1">
      <div class="col col-md-4 d-flex align-items-center">
        <logo @click.native="scrollToTop()" />
      </div>
      <div class="col-7 col-sm col-md-4">
        <div class="searchbar" @click="activateSearch()">
          <input type="text" class="form-control" placeholder="Find items" />
        </div>
      </div>
      <div class="col col-md-4 d-flex justify-content-end align-items-center">
        <div class="d-none d-md-block g-5 me-2">
          <nuxt-link to="/account">Account</nuxt-link>

          <div class="btn btn-primary" @click="$store.commit('modals/show', { name: 'create' })">Share</div>
        </div>

        <div class="btn btn-primary d-none d-lg-block" @click="$store.commit('modals/show', { name: 'connect' })">Sign in / Register</div>
        <div class="d-lg-none" @click="$store.commit('pushmenu/toggle')">
          <i class="bi lh-1 text-primary" style="font-size: 44px" :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"></i>
        </div>
      </div>
    </div>

    <div class="searchform fixed-top start-50 translate-middle-x bg-white p-2" :class="searchActive ? 'active' : false">
      <div class="row g-2">
        <div class="col-12 col-sm">
          <input type="text" class="form-control" placeholder="Find something..." ref="query" @input="(e) => (query = e.target.value)" />
        </div>
        <div class="col-9 col-sm">
          <input
            type="text"
            class="form-control"
            :class="missingInput && !this.placeValue ? 'border-danger' : false"
            placeholder="Address"
            ref="searchLoc"
            @input="(e) => (placeValue = e.target.value)"
          />
        </div>
        <div class="col-3 col-sm-2">
          <div class="btn btn-primary rounded w-100" @click="goSearch()">
            <i class="bi bi-search"></i>
          </div>
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
      query: undefined,
      place: undefined,
      placeValue: undefined,
      missingInput: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.aosHeader);

    var input = this.$refs["searchLoc"];
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      this.place = autocomplete.getPlace();
    });

    autocomplete.setFields(["address_components", "geometry", "name"]); // to do
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

      if (header) {
        let scrollY = window.pageYOffset;
        let direction = scrollY > this.prevPosY ? "down" : "up";

        if (direction === "down" && scrollY > 0 && !header.classList.contains("move-up")) {
          header.classList.remove("move-down");
          header.classList.add("move-up");
        }

        if (direction === "up" && !header.classList.contains("move-down")) {
          header.classList.remove("move-up");
          header.classList.add("move-down");
        }

        // update previous scroll positon
        this.prevPosY = window.scrollY;
      }
    },

    goSearch() {
      if (!this.place) {
        this.missingInput = true;
        return;
      }

      this.missingInput = false;

      this.$store.commit("search/setQuery", this.query === "" ? undefined : this.query);

      if (this.place) {
        this.$store.commit("search/setPlace", this.place);
      }
      this.placeValue = this.$refs["searchLoc"].value;

      let prevPlaceValue = this.$store.state.search.placeValue;
      if (this.placeValue) {
        this.$store.commit("search/setPlaceValue", this.placeValue);
      }
      this.searchActive = false; // hide search form
      let newPath = "/app/search";

      // location changed
      if (prevPlaceValue !== this.placeValue) {
        // update ad distance data in store

        let center;
        if (this.place) {
          let lat = this.place.geometry.location.lat();
          let lng = this.place.geometry.location.lng();
          let searchLocation = new google.maps.LatLng(lat, lng);
          center = searchLocation;
        } else {
          // use default
          center = this.$store.state.defaultLoc;
        }

        this.$store.commit("data/updateDistance", center);
      }

      this.$router.push({
        path: newPath,
        force: true,
      });

      this.$forceUpdate();

      // google.maps.event.trigger(this.$map, "resize");
    },

    activateSearch() {
      this.searchActive = true;
      let field = this.$refs["query"]; // document.getElementById("query");
      window.setTimeout(() => field.focus(), 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.move-up {
  transform: translateY(-100%);
}

.move-down {
  transform: translateY(0);
}

.header {
  background-color: #fff;
  // box-shadow: 0 0.125rem 0.25rem rgba(#000, 0.075);
  border-bottom: 1px solid rgba(#000, 0.175);
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  z-index: 4 !important;
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

.active {
  opacity: 1 !important;
  visibility: visible !important;
}

.searchform {
  width: 100vw;
  opacity: 0.2;
  visibility: hidden;
  transition: opacity 0.9s 0.1s cubic-bezier(0.2, 0, 0.1, 1);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

  @include media-breakpoint-up(lg) {
    width: auto;
    box-shadow: none;
  }
}
</style>
