<template>
  <div class="bg-white rounded overflow-hidden">
    <div class="row g-2">
      <div class="col-12 col-md-5">
        <nuxt-link :to="`/app/detail/${item.id}`">
          <ratio-visual :data="{ visual: item.visuals ? item.visuals[0] : undefined, name: item.title }" ratio="1x1" />
        </nuxt-link>
      </div>
      <div class="col-12 col-md-7">
        <div class="p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <formatted-date :date="$store.state.request.startdate * 1000" /> —
            <formatted-date :date="$store.state.request.enddate * 1000" />

            <hr />

            <h3>{{ item.title }}</h3>

            <p>{{ item.description }}</p>

            <p class="text-muted fw-bold">To {{ item.rent.start > 0 || item.rent.extra > 0 ? "rent" : "borrow" }}</p>
          </div>
          <div>
            <div v-if="item.deposit > 0">
              <span class="fw-bold">{{ item.deposit }} hbar</span> deposit
            </div>
            <div v-if="rent() > 0">
              <span class="fw-bold">{{ rent() }} hbar</span> rent
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { acceptRequest, getState, computeTotalRent } = require("@/utils/borrow.js");

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

    rent() {
      return computeTotalRent(this.item.rent, this.$store.state.request.startdate, this.$store.state.request.enddate);
    },
  },
};
</script>

<style></style>
