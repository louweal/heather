<template>
  <div v-if="$store.state.modals.show === 'call'">
    <div class="d-grid gap-2">
      <input
        type="text"
        class="form-control"
        :class="true === false ? 'border-danger' : false"
        placeholder="Title"
        :value="query ? query : ''"
        xxxinput="(e) => (newData['title'] = e.target.value)"
      />

      <textarea class="form-control" placeholder="Describe what you need and when you need it." />

      <div class="btn btn-primary" @click="publish()">Publish</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.modals.data;
    },

    query() {
      return this.$store.state.modals.data;
    },
  },

  methods: {
    publish() {},
  },
};
</script>

<style></style>
