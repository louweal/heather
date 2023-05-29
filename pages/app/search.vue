<template>
  <main>
    <google-map v-if="$store.state.map.show" />

    <section>
      <div class="container-fluid">
        <p>23 results for 'drill' found in your area</p>
        todo filter
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="row gy-3">
              <div class="col-12 col-sm-6 col-xxl-3" v-for="a in $store.state.data.ads" :key="a.id">
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

<script></script>

<style lang="scss" scoped></style>
