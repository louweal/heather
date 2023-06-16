<template>
  <div v-if="$store.state.modals.show === 'ownerReview'">
    <div class="d-grid gap-2">
      <div class="form-group">
        <textarea rows="5" class="form-control" @input="(e) => setReview(e.target.value)" />
      </div>
      <button class="btn btn-primary" @click="writeOwnerReview()">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: undefined,
    };
  },
  methods: {
    setReview(value) {
      this.review = value;
    },
    writeOwnerReview() {
      this.$store.commit("modals/hide");
    },
  },
};
</script>

<style></style>
