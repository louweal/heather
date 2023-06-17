<template>
  <div v-if="$store.state.modals.show === 'connect'">
    <div class="d-grid gap-2">
      <div class="btn btn-primary" @click="connectHashpack()">Connect using HashPack</div>

      <button class="btn text-center" @click="connect()">or connect using a demo wallet</button>
    </div>
  </div>
</template>

<script>
const { getUserData } = require("@/utils/storage/users.js");
const { getAd } = require("@/utils/storage/ads.js");
const { getCall } = require("@/utils/storage/calls.js");

export default {
  methods: {
    async connect() {
      let userdata = await getUserData(process.env.MY_ACCOUNT_ID); // todo hashpack option
      if (userdata) {
        this.$store.commit("user/setUserData", userdata);
        this.$store.commit("user/signIn");

        await this.getter(true, true);
        console.log("DONE!");

        this.$store.commit("modals/hide");
      } else {
        // show register modal
        this.$store.commit("modals/show", { name: "register" });
      }
    },

    async connectHashPack() {
      console.log("todo connect hashpack");
    },

    // async setter(setCalls, setAds) {
    //   if (this.$store.state.user.signedIn) {
    //     this.getter(setCalls, setAds);
    //   } else {
    //     console.log("Please sign in first to get local results");
    //   }
    // },

    async getter(getCalls, getAds) {
      // get calls and or ads from hedera network
      let users = this.$store.state.data.owners;

      let neighbors = users; //.filter((a) => a.distance <= 12); // tdodo
      console.log(neighbors.length);

      let ads = [];
      let calls = [];

      for (let i = 0; i < neighbors.length; i++) {
        let user = users[i];

        if (getCalls) {
          for (let j = 0; j < 9999; j++) {
            let call = await getCall(user.id, j);

            if (call) {
              let callData = { ...call, owner: user.id, i: j, type: "call" };
              calls.push(callData);
            }
            if (call === undefined) {
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

            if (ad) {
              let adData = { ...ad, owner: user.id, i: j };
              ads.push(adData);
            }
            if (ad === undefined) {
              // deleted call -> go to next iteration
              continue;
            } else {
              //reached end of ad list
              break;
            }
          }
        }
      }

      this.$store.commit("data/SET_CALLS", calls);
      this.$store.commit("data/SET_ADS", ads);
      this.$store.commit("data/updateDistance", this.$store.state.user.location);
    },
  },
};
</script>

<style></style>
