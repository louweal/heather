<template>
  <div v-if="$store.state.modals.show === 'call'">
    <div class="d-grid gap-2">
      <!-- <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        placeholder="Title"
        :value="query ? query : ''"
        xxxinput="(e) => (newData['title'] = e.target.value)"
      />

      <textarea class="form-control" placeholder="Describe what you need and when you need it." /> -->

      <input
        type="text"
        class="form-control"
        :class="!submitted || (submitted && isValue(newData.title)) ? false : 'border-danger'"
        placeholder="Title"
        :value="query ? query : ''"
        @input="(e) => setTitle(e.target.value)"
      />

      <textarea class="form-control" placeholder="Description" @input="(e) => setDescription(e.target.value)" />

      <div class="btn btn-primary" @click="addCall()">Publish</div>

      <p v-if="errors" class="text-center">Incorrect input</p>
    </div>
  </div>
</template>

<script>
const { addCall } = require("@/utils/storage/calls.js");

import Vue from "vue";

export default {
  data() {
    return {
      newData: { title: "" },
      submitted: false,
      errors: false,
    };
  },
  computed: {
    item() {
      return this.$store.state.modals.data;
    },

    query() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    isValue(value) {
      return value.length >= 3;
    },

    setTitle(value) {
      this.isValue(value); // check
      this.newData.title = value;
    },

    setDescription(value) {
      Vue.set(this.newData, "description", value);
    },

    async addCall() {
      this.submitted = true;

      if (this.isValue(this.newData.title)) {
        // console.log(this.newData);

        let data = { ...this.newData, id: self.crypto.randomUUID(), date: parseInt(new Date().getTime() / 1000) };

        // todo: add data to vuex store

        console.log(data);

        // add new ad to hedera storage
        let userId = this.$store.state.user.accountId; // todo

        let status = await addCall(userId, data);

        if (status === "SUCCESS") {
          this.$store.commit("modals/hide");

          // reset data
          this.newData = { title: "" };
        }

        // return;
      } else {
        this.errors = true;
      }
      this.submitted = false;
    },
  },
};
</script>

<style></style>
