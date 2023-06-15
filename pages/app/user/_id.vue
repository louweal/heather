<template>
  <main v-if="user">
    <section>
      <div class="container-xl">
        <h1>
          {{ user.name }}
        </h1>

        <p>
          {{ user.neighborhood }} <span class="opacity-75" v-if="distance"> {{ distance }} km</span>
        </p>

        <div class="row">
          <div class="col-12 col-sm-6 col-xxl-3" v-for="a in items" :key="a.id">
            <card-call v-if="a.type === 'call'" :data="a" />
            <card-ad v-else :data="a" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      id: undefined,
    };
  },

  created() {
    this.id = this.$route.params.id;
  },

  computed: {
    items() {
      let calls = this.$store.state.data.calls.filter((d) => d.owner === this.id);
      let ads = this.$store.state.data.ads.filter((d) => d.owner === this.id);
      return calls.concat(ads);
    },

    user() {
      return this.$store.state.data.owners.find((u) => u.id === this.id);
    },

    distance() {
      return this.user.distance;
    },
  },
};
</script>

<style></style>
