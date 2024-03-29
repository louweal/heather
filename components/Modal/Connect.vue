<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div v-if="$store.state.notice.active === true" class="text-center">
      <p><span class="spinner-grow spinner-grow-sm"></span> Please wait until all data is fetched.</p>
    </div>
    <div v-else class="d-grid gap-2">
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
      </div>

      <p class="text-center cp" @click="connect()">or connect using demo wallet {{ demoId }}</p>
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
      this.handleConnect(id); // redo look-up user on chain if id changes
    },
  },

  computed: {
    demoId() {
      return process.env.MY_ACCOUNT_ID;
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

      this.$hashconnect.connectToLocalWallet();

      // already paired
      if (this.$store.state.user.method === "signer") {
        await this.handleConnect(this.$store.state.user.id);
      } else {
        this.$store.commit("user/setMethod", { method: "signer" });
      }
    },

    async handleConnect(id) {
      // method is hashconnect, but it is not yet paired
      if (this.$store.state.user.id === process.env.MY_ACCOUNT_ID && this.$store.state.user.method === "signer") {
        return;
      }

      let userdata = await getUserData(id);
      if (userdata) {
        this.$store.commit("user/setUserData", userdata);
        this.$store.commit("data/updateOwnerDistance", this.$store.state.user.location);
        this.$store.commit("user/signIn");

        this.$store.commit("notice/show");
        await this.getter(true, true);
        this.$store.commit("notice/hide");
        this.$store.commit("modals/hide");
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

            if (typeof ad === "object" && ad.title) {
              let adData = { ...ad, owner: user.id, i: j };
              ads.push(adData);
            } else if (ad === undefined) {
              // deleted call -> go to next iteration
              continue;
            } else {
              //reached end of ad list
              break;
            }
          }
        }
      }

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
</script>

<style></style>
