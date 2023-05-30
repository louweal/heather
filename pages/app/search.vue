<template>
  <main :key="$store.state.search.placeValue">
    <google-map :class="$store.state.map.show ? 'd-block' : 'd-none d-md-block'" :zoom="zoom" :results="results" />
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6 mr-md-1">
            <div class="row mb-3">
              <div class="col-8 offset-4 col-sm-7 offset-sm-5 col-xxl-4 offset-xxl-8">
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
            </template>

            <template v-else>
              <p>Please use the search bar above to find items in your neighborhood.</p>
            </template>

            <div class="row gy-3">
              <div class="col-12 col-sm-6 col-xxl-3" v-for="a in results" :key="a.id">
                <card-ad :data="a" />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <!-- Silence is golden -->
          </div>
        </div>
      </div>
    </section>

    <div class="position-fixed start-50 translate-middle bottom-0 d-md-none" style="z-index: 4">
      <div class="btn btn-primary" v-if="!$store.state.map.show" @click="$store.commit('map/toggle')">
        <i class="bi bi-geo-alt-fill"></i> Map
      </div>
      <div class="btn btn-primary" v-if="$store.state.map.show" @click="$store.commit('map/toggle')"><i class="bi bi-grid"></i> List</div>
    </div>

    <modal name="request" title="">
      <modal-request />
    </modal>
  </main>
</template>

<script>
export default {
  data() {
    return {
      maxDistance: 1, // 1 km
      results: [],
      zoom: 16,
      renderMap: true,
    };
  },

  created() {
    this.results = this.filterData(this.maxDistance);
  },

  watch: {
    maxDistance: function (newDistance) {
      this.results = this.filterData(); // uses new maxDistance value to refilter
      console.log("Num results: " + this.results.length);
      let newZoom = Math.log2(40000 / (newDistance / 1));
      // let lat = this.$store.state.search.place.geometry.location.lat();
      // let newZoom = Math.log2((38000 * Math.cos((lat * Math.PI) / 180)) / distInKM) + 3;
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
    filterData() {
      let query = this.$store.state.search.query;
      let place = this.$store.state.search.place;

      let results;

      // filter to local results only
      if (place) {
        results = this.$store.state.data.ads.filter((a) => a.distance <= this.maxDistance);
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
