<template>
  <main>
    <google-map :class="$store.state.map.show ? 'd-block' : 'd-none d-md-block'" :zoom="zoom" :results="results" />
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6 mr-md-1">
            <div class="row mb-3">
              <div class="col-4 col-sm-5 col-xxl-8 align-self-center">
                <nuxt-link to="/app"><i class="bi bi-arrow-left text-primary fs-2"></i> </nuxt-link>
              </div>
              <div class="col-8 col-sm-7 col-xxl-4">
                <div class="d-flex align-items-center gap-2 justify-content-end">
                  <span>Distance:</span>

                  <select class="form-select" aria-label="select distance" v-model="maxDistance">
                    <option :value="0.5" selected>0.5 km</option>
                    <option :value="1">1 km</option>
                    <option :value="1.5">1.5 km</option>
                    <option :value="2">2 km</option>
                    <option :value="2.5">2.5 km</option>
                  </select>
                </div>
              </div>
            </div>

            <p>
              {{ results.length > 0 ? results.length : "No" }} result<span v-if="results.length !== 1">s</span>
              <span v-if="this.$store.state.search.query && this.$store.state.search.query !== ''">for </span
              ><span class="text-primary">{{ this.$store.state.search.query }}</span> in
              <span class="opacity-75">your neighborhood</span> (+{{ maxDistance }} km).
              <span v-if="results.length === 0"> Try to increase your search area.</span>
            </p>

            <p v-if="results.length === 0"><span class="text-primary">Tip:</span> Explore Leiden, The Netherlands.</p>

            <div class="row g-2">
              <template v-if="results.length > 0">
                <template v-for="(a, i) in results">
                  <div class="col-12 col-sm-6 col-xl-4" :key="a.id">
                    <card-call v-if="a.type === 'call'" :data="a" />
                    <card-ad v-else :data="a" />
                  </div>
                  <div
                    class="col-12 col-sm-6 col-xl-4"
                    :key="'banner_' + a.id"
                    v-if="i === 1 || (results.length < 1 && i === results.length - 1)"
                  >
                    <card-new-call title="Not found what you're looking for?" :query="$store.state.search.query" />
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="col-12 col-sm-6 col-xl-4" key="banner">
                  <card-new-call title="Not found what you're looking for?" :query="$store.state.search.query" />
                </div>
              </template>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <!-- Silence is golden -->
          </div>
        </div>
      </div>
    </section>

    <toggle-map />
  </main>
</template>

<script>
export default {
  data() {
    return {
      maxDistance: 1, // 1 km
      results: [],
      zoom: 15.5,
      renderMap: true,
    };
  },

  created() {
    this.results = this.filterData(this.maxDistance);
  },

  mounted() {
    this.validateAccess();
  },

  watch: {
    maxDistance: function (newDistance) {
      this.results = this.filterData(); // uses new maxDistance value to refilter
      let newZoom = Math.log2(40000 / (newDistance / 1));
      this.zoom = newZoom;
    },
    "$store.state.search.query": function () {
      this.results = this.filterData();
    },
  },

  methods: {
    validateAccess() {
      if (this.$store.state.user.signedIn === false) {
        return this.$nuxt.error({
          statusCode: 403,
          message: "Access denied",
        });
      }
    },

    filterData() {
      let query = this.$store.state.search.query;
      let calls = this.$store.state.data.calls;
      let ads = this.$store.state.data.ads;
      let results = calls.concat(ads);

      // filter to local results only
      if (this.$store.state.user.location) {
        calls = this.$store.state.data.calls.filter((a) => a.distance <= this.maxDistance);
        ads = this.$store.state.data.ads.filter((a) => a.distance <= this.maxDistance);
        results = calls.concat(ads);
        console.log(results);
      } else {
        console.log("Error: unknown search location");
        return [];
      }

      if (query) {
        query = query.toLowerCase();
        results = results.filter((a) => a.title.toLowerCase().includes(query));
      }

      return results.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    },
  },
};
</script>

<style lang="scss" scoped></style>
