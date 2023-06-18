<template>
  <div v-if="$store.state.modals.show === role + '-review'">
    <div class="d-grid gap-2" v-if="submitted === false">
      <div class="form-group">
        <textarea rows="5" class="form-control" @input="(e) => setReview(e.target.value)" />
      </div>
      <button class="btn btn-primary" @click="writeReview()">Submit</button>

      <p v-if="error" class="mt-1 text-center text-danger">{{ error }}</p>
    </div>
    <div class="d-grid gap-2" v-else>
      <p>Your review was successfully submitted.</p>
    </div>
  </div>
</template>

<script>
const { writeOwnerReview, writeBorrowerReview } = require("@/utils/borrow.js");

export default {
  props: {
    role: {
      type: String,
      default: "owner",
    },
  },
  data() {
    return {
      review: "",
      rid: undefined,
      error: undefined,
      submitted: false,
    };
  },

  created() {
    this.rid = this.$route.params.rid;
  },
  methods: {
    setReview(value) {
      this.review = value;
    },
    async writeReview() {
      this.submitted = false;
      if (this.review.length >= 3) {
        let res;
        if (this.role === "borrower") {
          // borrower
          res = await writeBorrowerReview(this.rid, this.review);
        } else {
          // owner
          res = await writeOwnerReview(this.rid, this.review);
        }

        if (res !== "SUCCESS") {
          this.error = "Unexpected error";
        } else {
          this.submitted = true;
          this.$store.commit("request/updateProgress");
        }
      } else {
        this.error = "Review is too short";
      }
    },
  },
};
</script>

<style></style>
