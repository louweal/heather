<template>
  <main>
    <div class="container-xl">
      <div class="row row-cols">
        <div class="col" v-for="(v, i) in item.visuals" :key="i">
          <visual :data="{ visual: v, name: item.title }" />
        </div>
      </div>
      {{ item }}

      <!-- {{ $route }} -->

      {{ $route.params.id }}

      <formatted-date :date="item.date" />
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    item() {
      let id = +this.$route.params.id;

      console.log(this.$store.state.data.ads);

      return this.$store.state.data.ads.find((a) => a.id === id);
    },
  },
};
</script>

<style></style>
