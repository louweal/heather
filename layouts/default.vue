<template>
  <div>
    <div id="page">
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <Header />

          <div id="pushdown" class="w-100" style="height: 80px" :class="$route.path === '/' ? 'd-none' : false"></div>
        </div>
        <Nuxt />

        <Footer v-if="!$route.path.includes('/app')" />
        <div v-else><!-- empty --></div>
      </div>
    </div>
    <modal name="connect" title="Connect">
      <modal-connect />
    </modal>

    <modal name="register" title="Welcome to Heather!">
      <modal-register />
    </modal>

    <modal name="update" title="Update your account">
      <modal-update />
    </modal>

    <modal name="welcome" :title="`Welcome to Heather, ${$store.state.user.name}!`">
      <modal-welcome />
    </modal>

    <modal name="request" title="Send request">
      <modal-request />
    </modal>

    <modal name="create" title="What are you going to share?">
      <modal-create />
    </modal>

    <modal name="call" title="Place a call">
      <modal-call />
    </modal>
    <pushmenu />
    <notice v-if="$store.state.notice.active"> </notice>

    <spinner />
  </div>
</template>

<script>
// import owners from "@/data/owners";
import ads from "@/data/ads";
import calls from "@/data/calls";

export default {
  // owners,
  ads,
  calls,

  transition: {
    name: "page",
    mode: "out-in",
  },

  async fetch() {
    // this.$store.commit("data/SET_OWNERS", this.$options.owners);

    let users = await this.getUsers();
    this.$store.commit("data/SET_USERS", users);

    let ads = await this.getAds();
    this.$store.commit("data/SET_ADS", ads);

    // this.$store.commit("data/SET_ADS", this.$options.ads);
    // this.$store.commit("data/SET_CALLS", this.$options.calls);
    // this.$store.commit("data/SET_BOTH"); // combine ads and calls
  },

  async mounted() {
    // let headerHeight = document.querySelector("#header").offsetHeight; //refs ?
    // let pushdown = document.querySelector("#pushdown"); // refs?
    // pushdown.style.height = headerHeight + "px";
  },

  methods: {
    async getUsers() {
      // find owners in localstorage

      let lsOwners = JSON.parse(localStorage.getItem("owners"));

      if (lsOwners) {
        return lsOwners;
      } else {
        // get owners from hedera network
        let numUsers = await this.$store.dispatch("user/getNumUsers", { contractId: process.env.USER_LOOKUP_CONTRACT });

        let users = [];
        for (let i = 0; i < numUsers; i++) {
          let userId = await this.$store.dispatch("user/getUserId", {
            contractId: process.env.USER_LOOKUP_CONTRACT,
            i,
          });

          // get user data
          if (userId) {
            let userData = await this.$store.dispatch("user/getUserData", {
              contractId: process.env.USER_LOOKUP_CONTRACT,
              accountId: userId,
            });
            // add user's accountId to data
            userData = { ...userData, id: userId };
            users.push(userData);
          }
        }
        return users;
      }
    },

    async getAds() {
      let lsAds = JSON.parse(localStorage.getItem("ads"));

      if (lsAds) {
        return lsAds;
      } else {
        // get ads from hedera network

        let users = this.$store.state.data.owners;
        for (let i = 0; i < users.length; i++) {
          let user = users[i];
          let userId = user.id; //
          let numUserAds = await this.$store.dispatch("user/getNumAds", {
            contractId: process.env.USER_LOOKUP_CONTRACT,
            accountId: userId,
          });

          for (let j = 0; j < numUserAds; j++) {
            // todo getAd
          }
        }
        return users;
      }
    },
  },
};
</script>
