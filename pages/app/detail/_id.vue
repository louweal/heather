<template>
  <main>
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6 col-xl-8 position-relative order-1 order-md-0">
            <template v-for="(v, i) in item.visuals">
              <div class="align-self-center" :class="i === curImage ? false : 'd-none'" :key="i">
                <visual :data="{ visual: v, name: item.title }" />
              </div>
            </template>
            <button
              @click="curImage -= 1"
              class="prev btn btn-primary position-absolute start-0 top-50 translate-middle-y m-3 p-2 lh-1 text-white"
              v-if="curImage > 0"
            >
              <i class="bi bi-arrow-left"></i>
            </button>

            <button
              @click="curImage += 1"
              class="next btn btn-primary position-absolute end-0 top-50 translate-middle-y m-3 p-2 lh-1 text-white"
              v-if="item.visuals.length > curImage + 1"
            >
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
          <div class="col-12 col-md-6 col-xl-4 order-0 order-md-1 h-100">
            <div class="bg-white rounded p-3 pt-2 d-flex justify-content-between flex-column">
              <div>
                <nuxt-link to="/app" class="d-block"><i class="bi bi-arrow-left text-primary fs-2"></i> </nuxt-link>

                <h1>{{ item.title }}</h1>

                <p v-if="item.description">{{ item.description }}</p>

                <!-- <p class="opacity-25">Shared on: <formatted-date :date="item.date" /></p> -->

                <div class="d-flex gap-2 align-items-center mt-3" v-if="item.name">
                  <button class="bg-light p-2 rounded-circle lh-1 text-white">
                    <i class="bi bi-person-fill"></i>
                  </button>
                  <div>
                    <div class="lh-sm">{{ item.name }}</div>
                    <div class="lh-sm">
                      {{ item.neighborhood }}
                      <span class="opacity-75" v-if="item.distance && $store.state.search.place"> {{ item.distance }} km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <div class="d-grid mt-2">
                  <button class="btn btn-primary" @click="$store.commit('modals/show', { name: 'request', data: data })">
                    Request to {{ item.type }}
                  </button>
                </div>
              </div>
            </div>

            <quick-map class="my-3" :marker="item" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container-fluid">
        <h3>Similar items</h3>

        <div class="row g-2">
          <template v-for="(a, i) in similar">
            <div class="col-12 col-sm-6 col-xxl-2" :id="i" :key="a.id">
              <card-ad v-if="a.type !== 'call'" :data="a" />
            </div>
          </template>
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
      curImage: 0,
    };
  },

  created() {
    this.id = +this.$route.params.id;
  },
  computed: {
    item() {
      return this.$store.state.data.ads.find((a) => a.id === this.id);
    },

    similar() {
      let category = this.item.category;
      if (!category) {
        return [];
      }
      return this.$store.state.data.ads
        .filter((a) => a.id !== this.id)
        .filter((a) => a.category === category)
        .slice(0, 6);
    },
  },
};
</script>

<style></style>
