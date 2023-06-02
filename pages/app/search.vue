<template>
  <main :key="$store.state.search.placeValue">
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
                    <option :value="1" selected>1 km</option>
                    <option :value="2">2 km</option>
                    <option :value="3">3 km</option>
                    <option :value="6">6 km</option>
                    <option :value="12">12 km</option>
                  </select>
                </div>
              </div>
            </div>

            <template v-if="this.$store.state.search.placeValue">
              <p>
                {{ results.length > 0 ? results.length : "No" }} result<span v-if="results.length !== 1">s</span>
                <span v-if="this.$store.state.search.query && this.$store.state.search.query !== ''">for </span
                ><span class="text-primary">{{ this.$store.state.search.query }}</span> in
                <span class="opacity-75">{{ this.$store.state.search.placeValue }}</span> (+{{ maxDistance }} km).
                <span v-if="results.length === 0"> Try to increase your search area.</span>
              </p>

              <p v-if="results.length === 0"><span class="text-primary">Tip:</span> Explore Leiden, The Netherlands.</p>
            </template>

            <template v-else>
              <p>Please use the search bar above to find items in your neighborhood.</p>

              <p><span class="text-primary">Tip:</span> Explore Leiden, The Netherlands.</p>
            </template>

            <div class="row gy-3">
              <div class="col-12 col-sm-6 col-xxl-3 order-3 order-sm-1 order-xxl-3">
                <card-new-call title="Not found what you're looking for?" :query="this.$store.state.search.query" />
              </div>
              <div class="col-12 col-sm-6 col-xxl-3" :class="`order-${i}`" v-for="(a, i) in results" :key="a.id">
                <card-call v-if="a.type === 'call'" :data="a" />
                <card-ad v-else :data="a" />
              </div>
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
      maxDistance: 12, // 1 km
      results: [],
      zoom: 15.5,
      renderMap: true,
    };
  },

  created() {
    this.results = this.filterData(this.maxDistance);
  },

  watch: {
    maxDistance: function (newDistance) {
      this.results = this.filterData(); // uses new maxDistance value to refilter
      // console.log("Num results: " + this.results.length);
      let newZoom = Math.log2(40000 / (newDistance / 1));
      this.zoom = newZoom;
    },
    "$store.state.search.query": function () {
      this.results = this.filterData();
    },
    "$store.state.search.placeValue": function () {
      this.results = this.filterData();
    },
  },

  methods: {
    explore() {
      this.$store.commit("search/setPlace");

      this.$router.push({
        path: newPath,
        force: true,
      });

      this.$forceUpdate();
    },
    filterData() {
      let query = this.$store.state.search.query;
      let place = this.$store.state.search.place;

      let results;

      // console.log(this.$store.state.data.both);

      // filter to local results only
      if (place) {
        results = this.$store.state.data.both.filter((a) => a.distance <= this.maxDistance);
        // console.log(results.length);
      } else {
        console.log("Error: unknown search location");
        return [];
      }

      if (query) {
        query = query.toLowerCase();
        results = results.filter((a) => a.title.toLowerCase().includes(query));
      }

      return results;
    },
  },
};
</script>

<style lang="scss" scoped></style>
