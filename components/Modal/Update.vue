<template>
  <div>
    <div class="d-grid gap-2">
      <span class="fw-bold">Your public profile</span>
      <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        :value="$store.state.user.name"
        @input="(e) => (name = e.target.value)"
      />

      <input type="text" class="form-control" :value="$store.state.user.neighborhood" @input="(e) => (neighborhood = e.target.value)" />

      <span class="fw-bold">Personal details</span>

      <div class="input-group">
        <span class="input-group-text">Account Id</span>
        <input type="text" class="form-control" placeholder="Wallet address*" :value="this.$store.state.user.id" disabled />
      </div>

      <input type="text" class="form-control" placeholder="Your address" ref="accountLoc2" id="accountLoc2" />
      <input type="email" class="form-control" :value="$store.state.user.email" @input="(e) => (email = e.target.value)" />
      <input type="tel" class="form-control" :value="$store.state.user.phone" @input="(e) => (phone = e.target.value)" />

      <div class="btn btn-primary" @click="updateUser()">Update account</div>
    </div>
  </div>
</template>

<script>
const { updateUser } = require("@/utils/storage/users.js");

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
    async updateUser() {
      //todo validate form

      let data = {
        id: this.$store.state.user.id,
        name: this.name || this.$store.state.user.name,
        neighborhood: this.neighborhood || this.$store.state.user.neighborhood,
        email: this.email || this.$store.state.user.email,
        phone: this.phone || this.$store.state.user.phone,
        location: this.location || this.$store.state.user.location,
      };

      // update user in hedera storage
      let status = await updateUser(data);

      if (status === "SUCCESS") {
        this.$store.commit("modals/hide");

        // add user data to store (current user)
        this.$store.commit("user/setUserData", data);
        this.$store.commit("data/updateOwnerDistance", this.$store.state.user.location);

        //update user in store (user list) and also updates user data in ads and calls
        this.$store.commit("data/updateUser", data);
        // add distance from current user to ad/call
        this.$store.commit("data/updateDistance", this.$store.state.user.location);
      } else {
        // todo
        console.log("Something went wrong");
      }
    },
  },

  mounted() {
    var input = document.querySelector("#accountLoc2"); //this.$refs["accountLoc2"];
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
