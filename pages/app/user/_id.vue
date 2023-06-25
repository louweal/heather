<template>
  <main v-if="user">
    <section>
      <div class="container-xl">
        <button @click="$router.go(-1)" class="btn p-0"><i class="bi bi-arrow-left text-primary fs-2"></i></button>

        <h1>
          {{ user.name }}
        </h1>

        <p>
          {{ user.neighborhood }} <span class="opacity-75" v-if="distance"> {{ distance }} km</span>
        </p>

        <div class="row g-2">
          <div class="col-12 col-sm-6 col-xxl-3" v-for="a in calls" :key="a.id">
            <card-call :data="a" />
          </div>

          <div class="col-12 col-sm-6 col-xxl-3" v-for="a in ads" :key="a.id">
            <card-ad :data="a" />
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
    ads() {
      return this.$store.state.data.ads.filter((d) => d.owner === this.id);
    },

    calls() {
      return this.$store.state.data.calls.filter((d) => d.owner === this.id);
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
