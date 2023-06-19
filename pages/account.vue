<template>
  <main>
    <div class="container-xl mt-3">
      <div class="row">
        <div class="col-12 col-md-9 order-1 order-md-0">
          <ul class="nav nav-tabs">
            <tab name="Your items" :num="numAds" />
            <tab name="Your calls" :num="numCalls" />
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade" :class="curTab === 'Your items' ? 'show active' : false">
              <div class="row my-3 g-3">
                <div class="col-12 col-md-6 col-lg-4" v-for="(a, i) in ads" :key="i">
                  <card-ad :data="a" />
                </div>
              </div>
            </div>
            <div class="tab-pane fade" :class="curTab === 'Your calls' ? 'show active' : false">
              <div class="row my-3 g-3">
                <div class="col-12 col-md-6 col-lg-4" v-for="(c, i) in calls" :key="i">
                  <card-call :data="c" />
                  <button class="btn text-danger" @click="removeCall(c.id, c.i)"><i class="bi bi-x-lg"></i> Delete</button>
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
                  <a :href="accountUrl" target="_blank">{{ id }} <i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                <div v-if="location">
                  <i class="bi bi-geo-alt-fill"></i>
                  <a :href="location" target="_blank">Location <i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                <div><i class="bi bi-envelope-fill"></i> {{ email }}</div>

                <div><i class="bi bi-telephone-fill"></i> {{ phone }}</div>

                <div class="mt-3 d-grid">
                  <button class="btn btn-primary" @click="disconnect()">Sign out</button>
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
const { removeCall } = require("@/utils/storage/calls.js");

export default {
  data() {
    return {};
  },

  async mounted() {
    this.validateAccess();
  },

  computed: {
    curTab() {
      return this.$store.state.tabs.name;
    },
    id() {
      return this.$store.state.user.id;
    },
    accountUrl() {
      return `https://testnet.dragonglass.me/hedera/accounts/${this.id}`;
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

    ads() {
      return this.$store.state.data.ads.filter((a) => a.owner === this.$store.state.user.id);
    },
    calls() {
      return this.$store.state.data.calls.filter((a) => a.owner === this.$store.state.user.id);
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

    async removeCall(id, i) {
      await removeCall(this.$store.state.user.id, i);
      this.$store.commit("data/removeCall", id);
      this.$router.push("/account?removed=" + id);
    },

    disconnect() {
      if (this.$store.state.user.method === "signer") {
        // hashconnect
        if (this.$hashconnect) {
          let pairingData = this.$hashconnect.hcData.pairingData;
          if (pairingData) {
            if (pairingData[0]) {
              let topic = pairingData[0].topic;
              if (topic) {
                this.$hashconnect.disconnect(topic);
              } else {
                console.log("No topic found");
              }
            } else {
              console.log("No pairing[0] data found.");
            }
          } else {
            console.log("No pairing data found.");
          }
        } else {
          console.log("No hashconnect found");
        }
      }
      localStorage.removeItem("hashconnectData");

      this.$store.commit("user/signOut");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
