<template>
  <main>
    <google-map v-if="$store.state.map.show" />

    <section>
      <div class="container-fluid">
        <p v-if="this.$store.state.search.query">
          {{ results.length }} result<span v-if="results.length > 1">s</span> for '{{ this.$store.state.search.query }}' found in your area
        </p>

        <p v-if="this.$store.state.search.place">
          {{ this.$store.state.search.place.geometry.location.lat() }}
        </p>

        <div class="row">
          <div class="col-12 col-md-6">
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
  created() {},

  computed: {
    results() {
      let query = this.$store.state.search.query;

      if (query) {
        query = query.toLowerCase();
        return this.$store.state.data.ads.filter((a) => a.title.toLowerCase().includes(query));
      }
      return [];
    },
  },
};
</script>
<style lang="scss" scoped></style>
