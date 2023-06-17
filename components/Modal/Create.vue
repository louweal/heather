<template>
  <div v-if="$store.state.modals.show === 'create'">
    <div class="d-grid gap-2">
      <div v-if="photos.length > 0" class="row row-cols-3 g-2">
        <div class="col align-self-center" v-for="(p, i) in photos" :key="i">
          <img :src="photos[i]" width="100%" />
        </div>
      </div>

      <div>
        <label for="files" class="btn btn-light">Upload images</label>
        <input type="file" id="files" name="files" multiple class="form-control" style="display: none" ref="files" @change="setPhotos()" />
      </div>

      <input
        type="text"
        class="form-control"
        :class="!submitted || (submitted && isValue(newData.title)) ? false : 'border-danger'"
        placeholder="Title"
        :value="data ? data.title : newData.title"
        @input="(e) => setTitle(e.target.value)"
      />

      <textarea class="form-control" placeholder="Description" @input="(e) => setDescription(e.target.value)" />

      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.deposit) ? false : 'border-danger'"
          placeholder="Deposit (optional)"
          @input="(e) => setDeposit(e.target.value)"
        />
        <span class="input-group-text">hbar</span>
      </div>

      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.rent.start) ? false : 'border-danger'"
          placeholder="Rent first day (optional)"
          @input="(e) => (newData['rent']['start'] = +e.target.value)"
        />
        <span class="input-group-text">hbar</span>
      </div>

      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.rent.extra) ? false : 'border-danger'"
          placeholder="Rent for each additional day (optional)"
          @input="(e) => (newData['rent']['extra'] = +e.target.value)"
        />
        <span class="input-group-text">hbar</span>
      </div>

      <div class="btn btn-primary" @click="createListing()">Create</div>

      <p v-if="errors" class="text-center">Incorrect input</p>
    </div>
  </div>
</template>

<script>
const { addAd } = require("@/utils/storage/ads.js");

import Vue from "vue";

export default {
  data() {
    return {
      newData: { type: "borrow", deposit: 0, rent: { start: 0, extra: 0 }, title: "", visuals: undefined },
      photos: [], // preview photos
      visuals: [],
      submitted: false,
      errors: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    isValue(value) {
      return value.length >= 3;
    },

    isInteger(value) {
      return Number.isInteger(+value);
    },

    setPhotos() {
      this.photos = [];
      let photos = this.$refs.files.files;

      console.log(photos);

      for (let i = 0; i < photos.length; i++) {
        // for preview
        const image = photos[i];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.photos.push(e.target.result);
        };

        // store image NAME only
        this.visuals.push(photos[i].name);
      }
    },

    setTitle(value) {
      this.isValue(value); // check
      this.newData.title = value;
    },

    setDescription(value) {
      Vue.set(this.newData, "description", value);
    },

    setRentStart(value) {
      this.isInteger(value); //check

      this.newData["rent"]["start"] = +value;
    },

    setRentExtra(value) {
      this.isInteger(value); //check

      this.newData["rent"]["extra"] = +value;
    },

    setDeposit(value) {
      this.isInteger(value); //check
      Vue.set(this.newData, "deposit", +value);
    },

    async createListing() {
      this.submitted = true;

      if (
        this.isValue(this.newData.title) &&
        this.isInteger(this.newData.rent.start) &&
        this.isInteger(this.newData.rent.extra) &&
        this.isInteger(this.newData.deposit)
      ) {
        this.newData["visuals"] = this.visuals;

        if (this.newData.rent.start > 0) {
          this.newData["type"] = "rent";
        } else {
          this.newData["type"] = "borrow";
        }

        let data = { ...this.newData, id: self.crypto.randomUUID(), date: parseInt(new Date().getTime() / 1000) };

        console.log(data);

        // add new ad to hedera storage
        let userId = this.$store.state.user.accountId; // todo
        let status = await addAd(userId, data);

        if (status === "SUCCESS") {
          // add to vuex store
          this.$store.commit("data/addAd", { ...data, owner: userId });

          this.$store.commit("modals/hide");

          // reset data
          this.newData = { type: "borrow", deposit: 0, rent: { start: 0, extra: 0 }, title: "", visuals: undefined };
          this.photos = [];
          this.visuals = [];
        }

        // return;
      } else {
        this.errors = true;
      }
      this.submitted = false;
    },

    setType(t) {
      Vue.set(this.newData, "type", t);
    },
  },
};
</script>

<style></style>
