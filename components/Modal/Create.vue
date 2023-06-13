<template>
  <div v-if="$store.state.modals.show === 'create'">
    <div class="d-grid gap-2">
      <!-- <div class="btn-group w-100 d-flex" role="group" aria-label="type">
        <button type="button" class="btn" :class="newData['type'] === 'borrow' ? 'btn-primary' : 'btn-light'" @click="setType('borrow')">
          To borrow
        </button>
        <button type="button" class="btn" :class="newData['type'] === 'rent' ? 'btn-primary' : 'btn-light'" @click="setType('rent')">
          To rent
        </button>
      </div> -->

      <div v-if="photos.length > 0" class="row row-cols-3 g-2">
        <div class="col align-self-center" v-for="(p, i) in photos" :key="i">
          <img :src="photos[i]" width="100%" />
        </div>
      </div>

      <input type="file" id="files" name="files" multiple class="form-control" ref="files" @change="setPhotos()" />

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
        <span class="input-group-text">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.deposit) ? false : 'border-danger'"
          placeholder="Deposit (optional)"
          @input="(e) => setDeposit(e.target.value)"
        />
      </div>

      <div class="input-group">
        <span class="input-group-text">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.rent.start) ? false : 'border-danger'"
          placeholder="Rent first day (optional)"
          @input="(e) => (newData['rent']['start'] = +e.target.value)"
        />
      </div>

      <div class="input-group">
        <span class="input-group-text">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="isInteger(newData.rent.extra) ? false : 'border-danger'"
          placeholder="Rent for each additional day (optional)"
          @input="(e) => (newData['rent']['extra'] = +e.target.value)"
        />
      </div>

      <div class="btn btn-primary" @click="createListing()">Create</div>

      <p v-if="errors" class="text-center">Incorrect input</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      newData: { type: "borrow", deposit: 0, rent: { start: 0, extra: 0 }, title: "", visuals: undefined },
      photos: [],
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

      for (let i = 0; i < photos.length; i++) {
        const image = photos[i];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.photos.push(e.target.result);
        };
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

      // check title is longer than 2
      this.isValue(this.newData.title);

      if (
        this.isValue(this.newData.title) &&
        this.isInteger(this.newData.rent.start) &&
        this.isInteger(this.newData.rent.extra) &&
        this.isInteger(this.newData.deposit)
      ) {
        // todo create contract

        if (this.newData.rent.start > 0) {
          this.newData["type"] = "rent";
        } else {
          this.newData["type"] = "borrow";
        }

        // console.log(this.newData);

        let ad = this.newData;
        let metadata = ad;

        let payload = {
          metadata,
          deposit: +ad.deposit,
          rent: ad.rent,
          accountId: process.env.MY_ACCOUNT_ID,
          factoryContractId: process.env.AD_FACTORY,
          lookupContractId: process.env.USER_LOOKUP_CONTRACT,
        };

        // console.log(payload);
        // return;
        this.$store.dispatch("data/deployAd", payload);

        this.$store.commit("modals/hide");
      } else {
        this.errors = true;
      }
    },

    setType(t) {
      Vue.set(this.newData, "type", t);
    },
  },
};
</script>

<style></style>
