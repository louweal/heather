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

    <modal name="updateAd" title="Change item details">
      <modal-update-ad />
    </modal>

    <modal name="call" title="Place a call">
      <modal-call />
    </modal>
    <pushmenu />
    <notice v-if="$store.state.notice.active"> </notice>

    <spinner />
    <div class="btn btn-primary" @click="setUsers()">set users</div>
    <div class="btn btn-primary" @click="setter(true, true)">set ads & calls</div>

    <nuxt-link class="btn btn-secondary" to="/createDummyUsers">create dummy users</nuxt-link>

    <nuxt-link class="btn btn-secondary" to="/createDummyAds">create dummy ads</nuxt-link>

    <br />
    Users: <br />
    {{ $store.state.data.owners }}

    <br />
    Ads:
    <br />
    {{ $store.state.data.ads }}
    <br />
    Calls:
    <br />
    {{ $store.state.data.calls }}
  </div>
</template>

<script>
const { getUserId, getUserData } = require("@/utils/storage/users.js");
const { getAd } = require("@/utils/storage/ads.js");
const { getCall } = require("@/utils/storage/calls.js");

export default {
  transition: {
    name: "page",
    mode: "out-in",
  },

  methods: {
    async setUsers() {
      let users = await this.getUsers();
      this.$store.commit("data/SET_USERS", users);
      this.$store.commit("data/updateOwnerDistance", this.$store.state.user.location);
    },

    async setter(setCalls, setAds) {
      if (this.$store.state.user.signedIn) {
        this.getter(setCalls, setAds);
      } else {
        console.log("Please sign in first to get local results");
      }
    },

    async getUsers() {
      // get owners from hedera network

      let users = [];
      for (let i = 0; i < 999999; i++) {
        let userId = await getUserId(i);
        console.log(userId);

        // get user data
        if (userId) {
          let userData = await getUserData(userId);
          // add user's accountId to data
          userData = { ...userData, id: userId };

          users.push(userData);
        } else {
          //reached end of userlist
          break;
        }
      }
      return users;
    },

    async getter(getCalls, getAds) {
      // get calls and or ads from hedera network
      let users = this.$store.state.data.owners;

      let neighbors = users.filter((a) => a.distance <= 12);
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
