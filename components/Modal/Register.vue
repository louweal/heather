<template>
  <div>
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
        <input type="text" class="form-control" placeholder="Wallet address*" :value="this.$store.state.user.id" disabled="true" />
      </div>

      <input type="text" class="form-control" placeholder="Your address" ref="accountLoc" id="accountLoc" />

      <input type="email" class="form-control" placeholder="Your e-mail" @input="(e) => (email = e.target.value)" />

      <input type="tel" class="form-control" placeholder="Your phone number" @input="(e) => (phone = e.target.value)" />

      <div class="btn btn-primary" @click="createAccount()">Create account</div>
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
    };
  },
  computed: {},

  methods: {
    async createAccount() {
      //todo validate form

      let data = {
        id: process.env.MY_ACCOUNT_ID,
        name: this.name,
        neighborhood: this.neighborhood,
        email: this.email,
        phone: this.phone,
        location: this.location,
      };

      // add user data to store ( current user details)
      this.$store.commit("user/setUserData", data);
      // add user to user list in data store
      this.$store.commit("data/addUser", data);

      // add user to hedera storage
      let status = await addUser(data);

      if (status === "SUCCESS") {
        this.$store.commit("modals/show", { name: "welcome" });
      } else {
        // todo
        console.log("Something went wrong");
      }
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
        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();
        this.location = { lat: lat, lng: lng };
      }
    });
    autocomplete.setFields(["address_components", "geometry", "name"]); // to do
  },
};
</script>

<style></style>
