<template>
  <div v-if="$store.state.modals.show === 'create'">
    <div class="d-grid gap-2">
      <div class="row g-2" v-if="showImages">
        <div class="col-11">
          <p>Select the images you want to add to your listing. It's currently not possible to upload your own images.</p>
        </div>
        <div class="col-4 cp" v-for="i in 9" :key="i" @click="selectImage(i)">
          <visual
            :data="{ visual: require(`/assets/images/dummy-drill.png`), name: 'dummy' }"
            :class="selectedImages[i] == true ? 'border border-primary' : false"
          />
        </div>

        <div class="col-12 d-grid">
          <div class="btn btn-primary" @click="showImages = false">Continue</div>
        </div>
      </div>

      <template v-else>
        <div class="btn btn-primary" @click="showImages = true">Add images</div>

        <input
          type="text"
          class="form-control"
          :class="true === false ? 'border-danger' : false"
          placeholder="Title"
          :value="data ? data.title : ''"
          @input="(e) => (newData['title'] = e.target.value)"
        />

        <textarea class="form-control" placeholder="Description" />

        <div class="btn-group w-100 d-flex" role="group" aria-label="type">
          <button type="button" class="btn btn-primary" @click="setType('borrow')">To borrow</button>
          <button type="button" class="btn btn-light" @click="setType('rent')">To rent</button>
        </div>

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
      </template>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      showImages: false,
      selectedImages: [],
      newData: { type: "borrow" },
    };
  },
  computed: {
    data() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    selectImage(i) {
      if (this.selectedImages[i] === true) {
        Vue.set(this.selectedImages, i, false);
      } else {
        Vue.set(this.selectedImages, i, true);
      }
      console.log(this.selectedImages);
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
