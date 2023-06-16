<template>
  <main>
    <section>
      <div class="container-xl">
        <back-button />

        <card-request :details="details" />
      </div>
    </section>
  </main>
</template>

<script>
const { getRequestDetails } = require("@/utils/borrow.js");

export default {
  async mounted() {
    let id = this.$route.params.rid;
    console.log("id :>> ", id);
    let details = await getRequestDetails(id);
    console.log(details);
  },
};
</script>

<style></style>
