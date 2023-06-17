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
            <h3>{{ item.title }}</h3>

            <p>{{ item.description }}</p>

            <p class="text-muted fw-bold">To {{ item.rent.start > 0 || item.rent.extra > 0 ? "rent" : "borrow" }}</p>

            <div v-if="item.deposit > 0">
              <span class="fw-bold">{{ item.deposit }} hbar</span> deposit
            </div>
            <div v-if="item.rent.start > 0">
              <span class="fw-bold">{{ item.rent.start }} hbar</span> first day
            </div>
            <div v-if="item.rent.extra > 0">
              <span class="fw-bold">{{ item.rent.extra }} hbar</span> each extra day
            </div>

            <hr />

            <formatted-date :date="$store.state.request.startdate * 1000" /> -
            <formatted-date :date="$store.state.request.enddate * 1000" />
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
