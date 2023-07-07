<template>
  <div v-if="!$store.state.user.signedIn">
    <p>Fill in the form below and you're ready to start sharing!</p>

    <form class="needs-validation d-grid gap-2" novalidate ref="form">
      <span class="fw-bold">Your public profile</span>

      <div class="form-group">
        <input type="text" class="form-control" placeholder="Your name" @input="(e) => (name = e.target.value)" required />
        <div class="invalid-feedback mb-1">Name is required</div>
      </div>

      <div class="form-group">
        <input type="text" class="form-control" placeholder="Your neigborhood" @input="(e) => (neighborhood = e.target.value)" required />
        <div class="invalid-feedback mb-1">Neighborhood is required</div>
      </div>

      <span class="fw-bold">Personal details</span>
      <div class="form-group">
        <div class="input-group" :key="this.$store.state.user.id">
          <span class="input-group-text">Account Id</span>
          <input type="text" class="form-control" placeholder="Wallet address*" :value="accountId" disabled="true" required />
        </div>
        <div class="invalid-feedback mb-1">Account Id not found</div>
      </div>

      <div class="form-group">
        <input type="text" class="form-control" placeholder="Your address" ref="accountLoc" id="accountLoc" required />
        <div class="invalid-feedback mb-1">Address is required</div>
      </div>

      <div class="form-group">
        <input type="email" class="form-control" placeholder="Your e-mail" @input="(e) => (email = e.target.value)" required />
        <div class="invalid-feedback mb-1">Email is required</div>
      </div>

      <div class="form-group">
        <input type="tel" class="form-control" placeholder="Your phone number" @input="(e) => (phone = e.target.value)" required />
        <div class="invalid-feedback mb-1">Phone number is required</div>
      </div>

      <button class="btn btn-primary" type="submit">Create account</button>
    </form>
  </div>
</template>

<script>
const { addUser } = require("@/utils/storage/users.js");
import { validateForm } from "~/utils/formValidator";

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

  mounted() {
    let form = this.$refs["form"];

    let valid = validateForm(form);

    if (valid) {
      // this.createAccount();
    }
    form.classList.add("was-validated");

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

  computed: {
    accountId() {
      if (this.$store.state.user.method === "signer") {
        return this.$store.state.user.id;
      } else {
        return process.env.MY_ACCOUNT_ID;
      }
    },
  },

  methods: {
    async createAccount() {
      //todo validate form

      let data = {
        id: this.accountId,
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
};
</script>

<style></style>
