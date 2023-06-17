<template>
  <div v-if="$store.state.modals.show === 'problem'">
    <div class="d-grid gap-2" v-if="submitted === false">
      <div class="form-group">
        <textarea rows="5" class="form-control" @input="(e) => setProblem(e.target.value)" />
      </div>
      <button class="btn btn-primary" @click="reportProblem()">Submit</button>

      <p v-if="error" class="mt-1 text-center text-danger">{{ error }}</p>
    </div>
    <div class="d-grid gap-2" v-else>
      <p>Your problem was successfully reported.</p>
    </div>
  </div>
</template>

<script>
const { reportProblem } = require("@/utils/borrow.js");

export default {
  data() {
    return {
      problem: "",
      rid: undefined,
      error: undefined,
      submitted: false,
    };
  },

  created() {
    this.rid = this.$route.params.rid;
  },
  methods: {
    setProblem(value) {
      this.problem = value;
    },
    async reportProblem() {
      this.submitted = false;
      if (this.problem.length >= 3) {
        let res = await reportProblem(this.rid, this.problem);

        if (res !== "SUCCESS") {
          this.error = "Unexpected error";
        } else {
          this.submitted = true;
        }
      } else {
        this.error = "Problem description is too short";
      }
    },
  },
};
</script>

<style></style>
