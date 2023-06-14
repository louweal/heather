<template>
  <main>
    <div class="container-xl mt-3">
      <div class="row">
        <div class="col-12 col-md-9 order-1 order-md-0">
          <ul class="nav nav-tabs">
            <tab name="Requests" :num="numRequests" />
            <tab name="Renting" :num="numRent" v-if="numRent > 0" />
            <tab name="Borrowing" :num="numBorrow" v-if="numBorrow > 0" />
            <tab name="Your items" :num="numAds" />
            <tab name="Your wishlist" :num="numCalls" />
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade pt-2" :class="curTab === 'Requests' ? 'show active' : false">
              <div v-if="numRequests === 0">
                <p>No pending requests for your items.</p>
              </div>

              <div>
                <card-request />
              </div>
            </div>

            <div class="tab-pane fade" :class="curTab === 'rent' ? 'show active' : false">rentt</div>
            <div class="tab-pane fade" :class="curTab === 'borrow' ? 'show active' : false">.bbb</div>
            <div class="tab-pane fade" :class="curTab === 'Your items' ? 'show active' : false">
              <div class="row my-3 g-3">
                <div class="col-12 col-md-6 col-lg-4" v-for="(a, i) in ads" :key="i">
                  <card-ad :data="a" />
                </div>
              </div>
            </div>
            <div class="tab-pane fade" :class="curTab === 'Your wishlist' ? 'show active' : false">
              <div class="row my-3 g-3">
                <div class="col-12 col-md-6 col-lg-4" v-for="(c, i) in calls" :key="i">
                  <card-call :data="c" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3 order-0 order-md-1">
          <sticky>
            <div>
              <div class="rounded bg-white p-3">
                <h3 class="mb-0 font-family-base">{{ name }}</h3>

                <div><i class="bi bi-houses-fill"></i> {{ neighborhood }}</div>
                <br />
                <h4 class="font-family-base fs-6">Personal details</h4>
                <div>
                  <i class="bi bi-wallet-fill"></i>
                  <a :href="accountUrl" target="_blank">{{ accountId }} <i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                <div v-if="location">
                  <i class="bi bi-geo-alt-fill"></i>
                  <a :href="location" target="_blank">Location <i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                <div><i class="bi bi-envelope-fill"></i> {{ email }}</div>

                <div><i class="bi bi-telephone-fill"></i> {{ phone }}</div>

                <div class="mt-3 d-grid">
                  <button
                    class="btn btn-primary"
                    @click="
                      $store.commit('user/signOut');
                      $router.push('/');
                    "
                  >
                    Sign out
                  </button>
                </div>
              </div>
              <button class="btn" @click="$store.commit('modals/show', { name: 'update' })">
                <i class="bi bi-pencil-square"></i> Edit profile
              </button>
              <button class="btn text-danger" @click="removeUser()"><i class="bi bi-x-lg"></i> Delete profile</button>
            </div>
          </sticky>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const { removeUser } = require("@/utils/storage/users.js");

export default {
  data() {
    return {};
  },

  async mounted() {
    // this.validateAccess();
  },

  computed: {
    curTab() {
      return this.$store.state.tabs.name;
    },
    accountId() {
      return this.$store.state.user.accountId;
    },
    accountUrl() {
      return `https://testnet.dragonglass.me/hedera/accounts/${this.accountId}`;
    },
    name() {
      return this.$store.state.user.name;
    },
    neighborhood() {
      return this.$store.state.user.neighborhood;
    },
    lat() {
      return this.$store.state.user.location ? this.$store.state.user.location.lat : 0;
    },
    lng() {
      return this.$store.state.user.location ? this.$store.state.user.location.lng : 0;
    },
    location() {
      if (this.lat !== 0 && this.lng !== 0) {
        return `https://maps.google.com?q=${this.lat},${this.lng}`;
      }
      return false;
    },
    phone() {
      return this.$store.state.user.phone;
    },
    email() {
      return this.$store.state.user.email;
    },
    numRequests() {
      return 0;
    },

    numRent() {
      return 0;
    },
    numBorrow() {
      return 0;
    },

    ads() {
      return this.$store.state.data.ads.filter((a) => a.owner === this.$store.state.user.accountId);
    },
    calls() {
      return this.$store.state.data.calls.filter((a) => a.owner === this.$store.state.user.accountId);
    },

    numAds() {
      return this.ads.length;
    },
    numCalls() {
      return this.calls.length;
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

    async removeUser() {
      let res = await removeUser();
      if (res === "SUCCESS") {
        this.$store.commit("user/signOut");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
