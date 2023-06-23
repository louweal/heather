<template>
  <div>
    <div id="page">
      <div class="min-vh-100 d-flex flex-column justify-content-between">
        <div>
          <Header />

          <div id="pushdown" class="w-100" style="height: 55px" :class="$route.path === '/' ? 'd-none' : false"></div>
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

    Calls
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

  created() {
    this.hashconnectInit();
  },

  async fetch() {
    if (this.$route.path.startsWith("/contact/success")) {
      return; // do not load data on this page
    }

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

    hashconnectInit() {
      let appMetadata = {
        name: "Heather",
        description: "Minimize your environmental impact by sharing resources",
        icon: "https://heather.codesparks.nl/ogImage.png",
      };

      this.$hashconnect.foundExtensionEvent.on((data) => {
        console.log("foundExtensionEvent", data);
        this.$store.commit("foundHashpack", data);
      });

      this.$hashconnect.pairingEvent.once((data) => {
        console.log("pairingEvent", data);

        this.$store.commit("user/setId", data.accountIds[0]);
      });

      //This is fired when HashConnect loses connection, pairs successfully, or is starting connection
      this.$hashconnect.connectionStatusChangeEvent.on((status) => {
        console.log("hashconnect state change event", status);
      });

      this.$hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
        //do something with acknowledge response data
        console.log("acknowledgeMessageEvent:");
        console.log(acknowledgeData);
      });

      this.$hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
        //do something with connection status
        console.log("connectionStatusChangeEvent");
        console.log(connectionStatus);
      });

      this.$hashconnect.init(appMetadata, this.$network, false);
    },
  },
};
</script>
