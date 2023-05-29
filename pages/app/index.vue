<template>
  <main>
    <google-map v-if="$store.state.map.show" />

    <section>
      <div class="container-fluid">
        <p>23 results for 'drill' found in your area</p>

        <div class="row">
          <div class="col-12 col-md-6">
            <div class="row gy-3">
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-call />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
              </div>
              <div class="col-12 col-sm-6 col-xxl-4">
                <card-ad />
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
  </main>
</template>

<script>
import owners from "@/data/owners";
import ads from "@/data/ads";

export default {
  owners,
  ads,
  async fetch() {
    this.$store.commit("data/SET_ADS", this.$options.ads);
    this.$store.commit("data/SET_OWNERS", this.$options.owners);
  },
};
</script>

<style lang="scss" scoped></style>
