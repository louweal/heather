<template>
  <div xxxv-if="$store.state.modals.show === 'register'">
    <p>Fill in the form below and you're ready to start sharing!</p>

    <div class="d-grid gap-2">
      <span class="fw-bold">Your public profile</span>
      <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        placeholder="Your name"
        @input="(e) => (name = e.target.value)"
      />

      <input type="text" class="form-control" placeholder="Your neigborhood" @input="(e) => (neighborhood = e.target.value)" />

      <span class="fw-bold">Personal details</span>

      <div class="input-group">
        <span class="input-group-text">Account Id</span>
        <input type="text" class="form-control" placeholder="Wallet address*" :value="this.$store.state.user.accountId" disabled="true" />
      </div>

      <input type="text" class="form-control" placeholder="Your address" ref="accountLoc" id="accountLoc" />

      <input type="email" class="form-control" placeholder="Your e-mail" @input="(e) => (email = e.target.value)" />

      <input type="tel" class="form-control" placeholder="Your phone number" @input="(e) => (phone = e.target.value)" />

      <div class="btn btn-primary" @click="createAccount()">Create account</div>

      <p class="text-center">Creating an account on Heather may involve Hedera network fees.</p>
    </div>
  </div>
</template>

<script>
const { addUser } = require("@/utils/storage/users.js");

export default {
  data() {
    return {
      name: undefined,
      neighborhood: undefined,
      location: undefined,
      email: undefined,
      phone: undefined,
      googleLoc: undefined,
    };
  },
  computed: {},

  methods: {
    async createAccount() {
      //todo validate form

      let data = {
        name: this.name,
        neighborhood: this.neighborhood,
        email: this.email,
        phone: this.phone,
      };

      // add user data to store
      this.$store.commit("user/setUserData", data);

      // add user to hedera storage
      let status = await addUser(data);

      if (status === "SUCCESS") {
        this.$store.commit("search/setPlace", this.googleLoc);

        this.$store.commit("modals/show", { name: "welcome" });

        this.$store.commit("user/signIn");
        this.updateDistance();
      } else {
        // todo
        console.log("Something went wrong");
      }
    },

    updateDistance() {
      let lat = this.$store.state.user.location.lat;
      let lng = this.$store.state.user.location.lng;
      let userLocation = new google.maps.LatLng(lat, lng);
      this.$store.commit("data/updateOwnerDistance", userLocation);
    },
  },

  mounted() {
    var input = document.querySelector("#accountLoc"); //this.$refs["accountLoc"];

    if (!google) {
      console.log("Failed to load google autocomplete");
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      if (place) {
        this.googleLoc = place;
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();

        this.$store.commit("user/setLocation", { lat: lat, lng: lng });
      }
    });
    autocomplete.setFields(["address_components", "geometry", "name"]); // to do
  },
};
</script>

<style></style>
