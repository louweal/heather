<template>
  <main>
    <google-map class="d-none d-md-block" :zoom="zoom" :results="results" />

    <section>
      <div class="container-fluid">
        <div class="row gy-3">
          <div class="col-md-6 mr-md-2">
            <div class="row g-2">
              <template v-if="$store.state.data.calls.length === 0 && $store.state.data.ads.length === 0">
                <p>No results found in your neighborhood.</p>
                <p><span class="text-primary">Tip:</span> Explore Leiden, The Netherlands.</p>
              </template>

              <template v-for="(a, i) in calls">
                <div class="col-12 col-sm-6 col-xl-4" :id="i" :key="a.id">
                  <card-call :data="a" />
                </div>
              </template>
              <template v-for="(a, i) in ads">
                <div class="col-12 col-sm-6 col-xl-4" :key="'banner_' + a.id" v-if="i === 2">
                  <card-new-call />
                </div>

                <div class="col-12 col-sm-6 col-xl-4" :id="i" :key="a.id">
                  <card-ad :data="a" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      maxDistance: 1, // 1 km
      zoom: 15.5,
    };
  },

  async created() {
    this.results = this.filterOwners(this.maxDistance);
  },

  mounted() {
    this.validateAccess();
  },

  computed: {
    ads() {
      return [...this.$store.state.data.ads].sort((a, b) => (a.date > b.date ? -1 : 1));
    },
    calls() {
      return [...this.$store.state.data.calls].sort((a, b) => (a.date > b.date ? -1 : 1));
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
    filterOwners() {
      // todo: move to default created() ?
      let defaultCenter = this.$store.state.user.location;
      this.$store.commit("data/updateOwnerDistance", defaultCenter);
      let results = this.$store.state.data.owners.filter((a) => a.distance <= this.maxDistance);

      return results;
    },
  },
};
</script>

<style></style>
