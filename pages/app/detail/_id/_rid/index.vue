<template>
  <main v-if="this.$store.state.user.signedIn">
    <section>
      <div class="container-xl">
        <div class="row">
          <div class="col-12 col-md-9" v-if="item">
            <card-request :item="item" />
          </div>
          <div class="col-12 col-md-3 text-center">
            <div class="fw-bold mb-2">Actions</div>

            {{ $store.state.request.startdate }}

            {{ $store.state.request.enddate }}

            <div class="d-grid gap-2 border">
              <template v-if="item && item.owner === $store.state.user.accountId">
                <!-- owner actions -->
                <template v-if="$store.state.request.state == 'Created'">
                  <!-- Created -->
                  <button class="btn btn-primary" @click="acceptRequest()">Accept borrow request</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Borrowed'">
                  <!-- Borrowed -->
                  <button class="btn btn-primary" @click="confirmReturn()">Confirm item return</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Returned'">
                  <!-- Borrowed -->
                  <button class="btn btn-primary" @click="acceptReturn()">Accept return</button>
                </template>
              </template>
            </div>

            <div class="d-grid border">
              <template v-if="$store.state.request.borrower === $store.state.user.accountId">
                <!-- borrower actions -->
                <template v-if="$store.state.request.state == 'Accepted'">
                  <!-- Created -->
                  <button class="btn btn-primary" @click="startBorrow()">Start borrowing</button>
                </template>
                <template v-else-if="$store.state.request.state == 'Borrowed'">
                  <!-- Borrowed -->
                  <button class="btn btn-primary" @click="returnBorrow()">Return item</button>
                </template>

                <template xxxv-if="$store.state.request.state == 'Accepted'">
                  <div><i class="bi bi-envelope-fill"></i> owner email</div>
                  <div><i class="bi bi-telephone-fill"></i> owner phone</div>
                </template>
              </template>
            </div>

            <p class="pt-3 text-danger" v-if="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="btn" @click="$store.commit('modals/show', { name: 'ownerReview' })">Show wor modal</div>

    <modal name="ownerReview" title="Write review">
      <modal-owner-review />
    </modal>
  </main>
</template>

<script>
const {
  getRequestDetails,
  getState,
  acceptRequest,
  startBorrow,
  returnBorrow,
  confirmReturn,
  acceptReturn,
  getDeposit,
  getTotalRent,
} = require("@/utils/borrow.js");

export default {
  data() {
    return {
      id: undefined,
      rid: undefined,
      error: undefined,
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.rid = this.$route.params.rid;

    if (!this.$store.state.user.signedIn) {
      this.$store.commit("modals/show", { name: "connect" });
    }

    // run queries
    this.getDetails();
    this.getState();
  },

  computed: {
    item() {
      return this.$store.state.data.ads.find((a) => a.id === this.id);
    },
  },
  methods: {
    async getDetails() {
      let details = await getRequestDetails(this.rid);
      this.$store.commit("request/setRequest", { id: this.rid, ...details });
    },

    async getState() {
      let state = await getState(this.rid);
      this.$store.commit("request/setState", state);
    },

    async acceptRequest() {
      let res = await acceptRequest(this.rid);
      if (res !== "SUCCESS") {
        this.error = "The borrow request is expired.";
      }
    },

    async startBorrow() {
      let numDays = (this.$store.state.request.enddate - this.$store.state.request.startdate) / 86400;
      console.log(numDays);
      let value = this.item.deposit + this.item.rent.start + (numDays - 1) * this.item.rent.extra;

      // return;
      let res = await startBorrow(this.rid, value);

      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      }
    },

    async returnBorrow() {
      let returndate = parseInt(new Date().getTime() / 1000);
      console.log(returndate);
      let res = await returnBorrow(this.rid, returndate);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      }
    },

    async confirmReturn() {
      let res = await confirmReturn(this.rid);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      }
    },

    async acceptReturn() {
      let res = await acceptReturn(this.rid);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      }
    },
  },
};
</script>

<style></style>
