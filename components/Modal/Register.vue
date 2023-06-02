<template>
  <div v-if="$store.state.modals.show === 'register'">
    <p>Fill in the form below and you're ready to start sharing!</p>

    <div class="d-grid gap-2">
      <span class="fw-bold">Your public profile</span>
      <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        placeholder="Your name"
        @input="(e) => setName(e.target.value)"
      />

      <input
        type="text"
        class="form-control"
        placeholder="Your neigborhood / village / city (shown publicly)"
        @input="(e) => setPlaceName(e.target.value)"
      />

      <span class="fw-bold">Personal details</span>

      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">Account Id</span>
        <input type="text" class="form-control" placeholder="Wallet address*" :value="this.$store.state.user.accountId" disabled />
      </div>

      <input type="text" class="form-control" placeholder="Your address" ref="accountLoc" />

      <input type="email" class="form-control" placeholder="Your e-mail" @input="(e) => setEmail(e.target.value)" />

      <input type="tel" class="form-control" placeholder="Your phone number" @input="(e) => setPhone(e.target.value)" />

      <div class="btn btn-primary" @click="createAccount()">Create account</div>

      <p class="text-center">Creating an account on Heather may involve Hedera network fees.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},

  methods: {
    setName(name) {
      this.$store.commit("user/setName", name);
    },

    setPlaceName(placeName) {
      // user input: city name/ village name / neighborhood name
      this.$store.commit("user/setPlaceName", placeName);
    },

    setEmail(email) {
      this.$store.commit("user/setEmail", email);
    },
    setPhone(phone) {
      this.$store.commit("user/setPhone", phone);
    },

    createAccount() {
      //todo
    },
  },

  mounted() {
    var input = this.$refs["accountLoc"];
    console.log(input);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      if (place) {
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
