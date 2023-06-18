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
    <notice v-if="$store.state.notice.active === true" />

    <!--
    <nuxt-link class="btn btn-secondary" to="/createDummyUsers">create dummy users</nuxt-link>

    <nuxt-link class="btn btn-secondary" to="/createDummyAds">create dummy ads</nuxt-link> -->

    <!-- <br />
    Users: <br />
    {{ $store.state.data.owners }}

    <br />
    Ads: <br />
    {{ $store.state.data.ads }} -->
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

  async fetch() {
    this.$store.commit("notice/show");
    await this.setUsers();
    this.$store.commit("notice/hide");
  },

  methods: {
    async setUsers() {
      let users = await this.getUsers();
      this.$store.commit("data/SET_USERS", users);
    },

    async getUsers() {
      // get owners from hedera network

      let users = [];
      for (let i = 0; i < 999999; i++) {
        let userId = await getUserId(i);

        // get user data from hedera
        if (typeof userId === "string" && userId.startsWith("0.0.")) {
          let userData = await getUserData(userId);
          users.push(userData);
        } else {
          //reached end of userlist
          break;
        }
      }
      return users;
    },
  },
};
</script>
