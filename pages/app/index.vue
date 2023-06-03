<template>
  <main>
    <google-map :class="$store.state.map.show ? 'd-block' : 'd-none d-md-block'" :zoom="zoom" :results="results" />

    <section>
      <div class="container-fluid" v-if="$store.state.data.ads">
        <div class="row gy-3">
          <div class="col-md-6 mr-md-2">
            <div class="row g-2">
              <template v-for="(a, i) in $store.state.data.both">
                <div class="col-12 col-sm-6 col-xxl-3" :key="'banner_' + a.id" v-if="i === 3">
                  <card-new-call />
                </div>

                <div class="col-12 col-sm-6 col-xxl-3" xxxclass="`order-${i}`" :id="i" :key="a.id">
                  <card-call v-if="a.type === 'call'" :data="a" />

                  <card-ad v-else :data="a" />
                </div>
              </template>
            </div>
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
      results: [],
      maxDistance: 12, // 1 km
      zoom: 15.5,
    };
  },

  created() {
    this.results = this.filterOwners(this.maxDistance);
  },

  methods: {
    filterOwners() {
      let defaultCenter = this.$store.state.defaultLoc;

      this.$store.commit("data/updateOwnerDistance", defaultCenter);

      let results = this.$store.state.data.owners.filter((a) => a.distance <= this.maxDistance);
      console.log(results.length);

      return results;
    },
  },
};
</script>

<style></style>
