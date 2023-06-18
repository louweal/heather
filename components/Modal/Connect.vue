<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div class="d-grid gap-2">
      <button class="btn btn-primary" @click="connectHashconnect()" :class="!$store.state.foundHashpack ? 'disabled' : false">
        <span class="spinner-grow spinner-grow-sm" v-if="showSpinner"></span> Connect using Hashpack
      </button>

      <div class="text-center">
        <p class="text-danger" v-if="!$store.state.foundHashpack">
          Unable to detect HashPack browser extension. Please, install the
          <a href="https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk" target="_blank"
            >Hashpack
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
          browser extension from the Chrome Web Store.
        </p>
        <!-- <p v-else class="text-success">Found Hashpack</p> -->
      </div>

      <p class="text-center cp" @click="connect()">or connect using a demo wallet</p>
    </div>
  </div>
</template>

<script>
const { getUserData } = require("@/utils/storage/users.js");
const { getAd } = require("@/utils/storage/ads.js");
const { getCall } = require("@/utils/storage/calls.js");

export default {
  data() {
    return {
      showSpinner: false,
    };
  },

  watch: {
    "$store.state.user.id": function (id) {
      console.log("id :>> ", id);
      this.handleConnect(id); // redo look-up user on chain if id changes
    },
  },

  methods: {
    async connect() {
      let id = process.env.MY_ACCOUNT_ID;
      this.$store.commit("user/setMethod", { method: "client" });
      await this.handleConnect(id);
    },

    async connectHashconnect() {
      this.showSpinner = true;
      this.$store.commit("user/setMethod", { method: "signer" });

      this.$hashconnect.connectToLocalWallet();

      // already paired
      console.log(this.$store.state.user.method);
      if (this.$store.state.user.method === "signer") {
        await this.handleConnect(this.$store.state.user.id);
      } else {
      }
    },

    async handleConnect(id) {
      let userdata = await getUserData(id);
      if (userdata) {
        this.$store.commit("user/setUserData", userdata);
        this.$store.commit("data/updateOwnerDistance", this.$store.state.user.location);
        this.$store.commit("user/signIn");
        this.$store.commit("modals/hide");

        this.$store.commit("notice/show");
        await this.getter(true, true);
        this.$store.commit("notice/hide");
      } else {
        this.$store.commit("modals/hide");
        // show register modal
        this.$store.commit("modals/show", { name: "register" });
      }
      this.showSpinner = false;
    },

    async getter(getCalls, getAds) {
      // get calls and or ads from hedera network
      let users = this.$store.state.data.owners;

      let neighbors = users.filter((a) => a.distance <= 1); // todo
      console.log(neighbors.length);

      let ads = [];
      let calls = [];

      for (let i = 0; i < neighbors.length; i++) {
        let user = users[i];

        if (getCalls) {
          for (let j = 0; j < 9999; j++) {
            let call = await getCall(user.id, j);

            if (typeof call === "object" && call.title) {
              let callData = { ...call, owner: user.id, i: j, type: "call" };
              calls.push(callData);
            } else if (call === undefined) {
              console.log("removed call");
              // deleted call -> go to next iteration
              continue;
            } else {
              //reached end of ad list
              break;
            }
          }
        }

        if (getAds) {
          for (let j = 0; j < 9999; j++) {
            let ad = await getAd(user.id, j);

            console.log("where are my ads?");
            console.log(ad);

            if (typeof ad === "object" && ad.title) {
              let adData = { ...ad, owner: user.id, i: j };
              ads.push(adData);
            } else if (ad === undefined) {
              console.log("removed ad");
              // deleted call -> go to next iteration
              continue;
            } else {
              console.log(ad);
              //reached end of ad list
              break;
            }
          }
        }
      }

      console.log("calls.length :>> ", calls.length);
      console.log("ads.length :>> ", ads.length);
      if (calls.length > 0) {
        this.$store.commit("data/SET_CALLS", calls);
      }
      if (ads.length > 0) {
        this.$store.commit("data/SET_ADS", ads);
      }
      this.$store.commit("data/updateDistance", this.$store.state.user.location);
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
</script>

<style></style>
