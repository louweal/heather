<template>
  <div class="bg-white rounded overflow-hidden" v-if="this.$store.state.data.ads.length > 0" :key="$store.state.user.signedIn">
    <div class="row g-2">
      <div class="col-12 col-md-4">
        <nuxt-link :to="`/app/detail/${item.id}`">
          <ratio-visual :data="{ visual: item.visuals ? item.visuals[0] : undefined, name: item.title }" ratio="1x1" />
        </nuxt-link>
      </div>
      <div class="col-12 col-md-8">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="fw-bold" @click="getState()">
              State: {{ $store.state.request.state }} <badge><i class="bi bi-arrow-clockwise bg-secondary"></i></badge>
            </div>

            <p>{{ $store.state.request.message }}</p>

            <div class="row mb-2">
              <div class="col-12 col-md-6">
                <nuxt-link :to="`/app/user/${owner.id}`" class="d-flex gap-2 align-items-start mb-2">
                  <button class="bg-primary p-2 rounded-circle lh-1 text-white">
                    <i class="bi bi-person-fill"></i>
                  </button>
                  <div>
                    <div class="xxxlh-1">{{ name }}</div>
                    <div class="xxxlh-sm">
                      {{ neighborhood }}
                      <span class="opacity-75 fw-medium" xxxv-if="data.distance && place"> {{ distance }} km</span>
                    </div>
                    <div><i class="bi bi-envelope-fill"></i> borrower email</div>
                    <div><i class="bi bi-telephone-fill"></i> borrower phone</div>
                  </div>
                </nuxt-link>
              </div>

              <div class="col-12 col-md-6">
                <div class="d-flex gap-2 align-items-start">
                  <span class="bg-primary p-2 rounded-circle lh-1 text-white">
                    <i class="bi bi-calendar2-plus-fill"></i>
                  </span>
                  <div>
                    <div class="xxlh-sm">From: <formatted-date :date="$store.state.request.startdate * 1000" /></div>
                    <div class="xxxlh-sm">Until: <formatted-date :date="$store.state.request.enddate * 1000" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { acceptRequest, getState } = require("@/utils/borrow.js");

acceptRequest;
export default {
  props: {
    item: {
      type: [Object, Array],
      default: () => {},
    },
  },

  data() {
    return {
      rid: undefined,
    };
  },

  computed: {
    name() {
      return this.owner.name;
    },
    owner() {
      return this.$store.state.data.owners.find((o) => o.id === this.item.owner);
    },
    neighborhood() {
      return this.owner.neighborhood;
    },
    distance() {
      return 0;
    },
  },

  created() {
    this.rid = this.$route.params.rid;
  },

  methods: {
    async getState() {
      console.log(this.rid);
      let state = await getState(this.rid);
      this.$store.commit("request/setState", state);
    },
  },
};
</script>

<style></style>
