<template>
  <div v-if="$store.state.modals.show === 'create'">
    <div class="d-grid gap-2">
      <div class="btn-group w-100 d-flex" role="group" aria-label="type">
        <button type="button" class="btn" :class="newData['type'] === 'borrow' ? 'btn-primary' : 'btn-light'" @click="setType('borrow')">
          To borrow
        </button>
        <button type="button" class="btn" :class="newData['type'] === 'rent' ? 'btn-primary' : 'btn-light'" @click="setType('rent')">
          To rent
        </button>
      </div>

      <div v-if="photos.length > 0" class="row row-cols-3 g-2">
        <div class="col align-self-center" v-for="(p, i) in photos" :key="i">
          <img :src="photos[i]" width="100%" />
        </div>
      </div>

      <input type="file" id="files" name="files" multiple class="form-control" ref="files" @change="setPhotos()" />

      <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        placeholder="Title"
        :value="data ? data.title : ''"
        @input="(e) => (newData['title'] = e.target.value)"
      />

      <textarea class="form-control" placeholder="Description" />

      <div class="input-group" v-if="newData.type === 'borrow'">
        <span class="input-group-text" id="basic-addon1">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="true === false ? 'border-danger' : false"
          placeholder="Deposit"
          @input="(e) => (newData['deposit'] = e.target.value)"
        />
      </div>

      <div class="input-group" v-if="newData.type === 'rent'">
        <span class="input-group-text" id="basic-addon1">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="true === false ? 'border-danger' : false"
          placeholder="Rent first day"
          @input="(e) => (newData['rent']['start'] = e.target.value)"
        />
      </div>

      <div class="input-group" v-if="newData.type === 'rent'">
        <span class="input-group-text" id="basic-addon1">ħ</span>

        <input
          type="text"
          class="form-control"
          :class="true === false ? 'border-danger' : false"
          placeholder="Rent for each additional day"
          @input="(e) => (newData['rent']['extra'] = e.target.value)"
        />
      </div>

      <div class="btn btn-primary" @click="createListing()">Create</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      newData: { type: "borrow" },
      photos: [],
    };
  },
  computed: {
    data() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    setPhotos() {
      this.photos = [];
      let photos = this.$refs.files.files;
      // console.log(this.photos[0]);

      for (let i = 0; i < photos.length; i++) {
        const image = photos[i];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.photos.push(e.target.result);
        };
      }
    },

    createListing() {
      // todo create contract
      $store.commit("modals/hide");
    },

    setType(t) {
      Vue.set(this.newData, "type", t);
    },
  },
};
</script>

<style></style>
