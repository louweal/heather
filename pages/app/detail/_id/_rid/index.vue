<template>
  <main v-if="this.$store.state.user.signedIn">
    <section>
      <div class="container-xl">
        <div class="row">
          <div class="col-12 col-md-3">
            <badge>State</badge>
            <borrow-state />

            <div class="d-grid mt-2">
              <div class="btn btn-primary" @click="getState()">Sync state</div>
            </div>

            <card-user :user="owner" role="owner" v-if="isBorrower" />
            <card-user :user="borrower" role="borrower" v-if="isOwner" />
          </div>

          <div class="col-12 col-md-9">
            <div class="d-grid gap-3" v-if="item">
              <card-request :item="item" />

              <template v-if="item && item.owner === $store.state.user.id">
                <!-- owner actions -->
                <template v-if="$store.state.request.state == 'Created'">
                  <div class="bg-light rounded p-2" v-if="$store.state.request.message.length > 0">
                    <p>{{ $store.state.request.message }}</p>
                  </div>
                  <!-- Created -->
                  <button class="btn btn-primary" @click="acceptRequest()">Accept borrow request</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Borrowed'">
                  <!-- Borrowed -->
                  <button class="btn btn-primary" @click="confirmReturn()">Confirm return</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Returned'">
                  <!-- Borrowed -->
                  <div class="btn-group" role="group">
                    <button class="btn btn-secondary" @click="acceptReturn()">Accept return</button>
                    <button type="button" class="btn btn-outline-primary" @click="$store.commit('modals/show', { name: 'problem' })">
                      Report problem
                    </button>
                    <button v-if="missing" type="button" class="btn btn-dark" @click="reportMissing()">Report missing</button>
                  </div>
                </template>

                <template v-else-if="$store.state.request.state == 'Checked'">
                  <button class="btn btn-primary" @click="$store.commit('modals/show', { name: 'owner-review' })">Write review</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Reviewed'">
                  <div v-if="borrowerReview" class="bg-light rounded p-2">
                    <p>{{ borrowerReview }}</p>
                  </div>
                  <div v-if="ownerReview">
                    <p class="opacity-75">You have left following review:</p>
                    <div class="bg-light rounded p-2">
                      {{ ownerReview }}
                    </div>
                  </div>
                  <div v-if="borrowerReview">
                    <p class="opacity-75">{{ borrower.name }} has left following review:</p>
                    <div class="bg-light rounded p-2">
                      {{ borrowerReview }}
                    </div>
                  </div>
                </template>
              </template>

              <template v-if="$store.state.request.borrower === $store.state.user.id">
                <!-- borrower actions -->
                <template v-if="$store.state.request.state == 'Accepted'">
                  <!-- Created -->
                  <button class="btn btn-primary" @click="startBorrow()">Start borrowing</button>
                </template>
                <template v-else-if="$store.state.request.state == 'Borrowed'">
                  <!-- Borrowed -->
                  <button class="btn btn-primary" @click="returnBorrow()">Return item</button>
                </template>

                <template v-else-if="$store.state.request.state == 'Checked' || $store.state.request.state == 'Reviewed'">
                  <!-- Checked -->
                  <div v-if="problem">
                    <p class="text-danger">
                      Unfortunately, you've lost your deposit because the owner of the item detected a problem. Contact the owner for more
                      details.
                    </p>

                    <div class="bg-light rounded p-2">
                      <p class="mb-0 text-primary">
                        <span class="fw-bold">Problem:</span> <i>{{ problem }}</i>
                      </p>
                    </div>
                  </div>

                  <button class="btn btn-primary" @click="$store.commit('modals/show', { name: 'borrower-review' })">Write review</button>
                </template>
              </template>

              <p class="pt-3 text-danger" v-if="error">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <modal name="owner-review" title="Write review">
      <modal-review role="owner" />
    </modal>

    <modal name="borrower-review" title="Write review">
      <modal-review role="borrower" />
    </modal>

    <modal name="problem" title="Report problem">
      <modal-problem />
    </modal>
  </main>
</template>

<script>
const {
  getRequestDetails,
  getState,
  getBorrower,
  acceptRequest,
  startBorrow,
  returnBorrow,
  confirmReturn,
  acceptReturn,
  getTotalRent,
  getOwnerReview,
  getBorrowerReview,
  getProblem,
} = require("@/utils/borrow.js");

export default {
  data() {
    return {
      id: undefined,
      rid: undefined,
      error: undefined,
      borrowerReview: undefined,
      ownerReview: undefined,
      problem: undefined,
    };
  },

  watch: {
    "$store.state.request.state": async function (val) {
      if (val === "Checked") {
        this.problem = await getProblem(this.rid);
      }
      if (val === "Reviewed") {
        this.borrowerReview = await getBorrowerReview(this.rid);
        this.ownerReview = await getOwnerReview(this.rid);
      }
    },
    "$store.state.request.progress": async function () {
      this.getState();
    },
  },

  async created() {
    this.id = this.$route.params.id;
    this.rid = this.$route.params.rid;

    if (!this.$store.state.user.signedIn) {
      this.$store.commit("modals/show", { name: "connect" });
    }

    if (this.$store.state.request.state === "Checked") {
      this.problem = await getProblem(this.rid);
    }

    // run queries
    this.getDetails();
    this.getState();

    let borrower = await getBorrower(this.rid);
    // let owner = await getOwner(this.rid);
    console.log("borrower :>> ", borrower);
    // console.log("owner :>> ", owner);
  },

  computed: {
    item() {
      let ads = this.$store.state.data.ads;
      if (ads.length > 0) {
        return ads.find((a) => a.id === this.id);
      }
      return undefined;
    },

    owner() {
      if (this.item) {
        return this.$store.state.data.owners.find((o) => o.id === this.item.owner);
      }
      return undefined;
    },

    borrowerId() {
      return this.$store.state.request.borrower;
    },

    borrower() {
      return this.$store.state.data.owners.find((o) => o.id === this.borrowerId);
    },

    isBorrower() {
      return this.$store.state.user.id === this.$store.state.request.borrower;
    },
    isOwner() {
      return this.item ? this.$store.state.user.id === this.item.owner : false;
    },

    missing() {
      // 7 days late
      // return true;
      return this.$store.state.request.enddate + 86400 * 7 <= new Date() / 1000;
    },
  },
  mounted() {
    this.validateAccess();
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
        this.error = "Unexpected error";
      } else {
        this.$store.commit("request/updateProgress");
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
      } else {
        this.$store.commit("request/updateProgress");
      }
    },

    async returnBorrow() {
      let returndate = parseInt(new Date().getTime() / 1000);
      console.log(returndate);
      let res = await returnBorrow(this.rid, returndate);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      } else {
        this.$store.commit("request/updateProgress");
      }
    },

    async confirmReturn() {
      let res = await confirmReturn(this.rid);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      } else {
        this.$store.commit("request/updateProgress");
      }
    },

    async acceptReturn() {
      let res = await acceptReturn(this.rid);
      if (res !== "SUCCESS") {
        this.error = "Unexpected error";
      } else {
        this.$store.commit("request/updateProgress");
      }
    },
  },
};
</script>

<style></style>
