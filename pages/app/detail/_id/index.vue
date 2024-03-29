<template>
  <main v-if="item">
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-6 col-xl-8 position-relative order-1 order-md-0">
            <template v-if="item.visuals">
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
            </template>
          </div>
          <div class="col-12 col-md-6 col-xl-4 order-0 order-md-1 h-100">
            <div class="bg-white rounded p-3 pt-2 d-flex justify-content-between flex-column">
              <div>
                <!-- <nuxt-link to="/app" class="d-block"><i class="bi bi-arrow-left text-primary fs-2"></i> </nuxt-link> -->
                <button @click="$router.go(-1)" class="btn p-0"><i class="bi bi-arrow-left text-primary fs-2"></i></button>

                <h1>{{ item.title }}</h1>

                <p v-if="item.description">{{ item.description }}</p>
              </div>

              <p class="text-muted fw-bold">To {{ item.rent.start > 0 || item.rent.extra > 0 ? "rent" : "borrow" }}</p>

              <div class="d-grid mt-2">
                <div class="vstack lh-sm">
                  <span v-if="item.deposit > 0">
                    <span class="fw-bold">{{ item.deposit }} hbar</span> deposit
                  </span>
                  <span v-if="item.rent.start > 0">
                    <span class="fw-bold">{{ item.rent.start }} hbar</span> first day
                  </span>
                  <span v-if="item.rent.extra > 0">
                    <span class="fw-bold">{{ item.rent.extra }} hbar</span> each extra day
                  </span>
                </div>

                <button v-if="!mine" class="btn btn-primary mt-2" @click="$store.commit('modals/show', { name: 'request', data: item })">
                  Request to {{ item.type }}
                </button>
              </div>
            </div>

            <div class="bg-white rounded p-3 mt-2">
              <nuxt-link :to="`/app/user/${item.owner}`" class="d-flex gap-2 align-items-center" v-if="item.name">
                <div class="bg-light p-2 rounded-circle lh-1 text-white">
                  <i class="bi bi-person-fill"></i>
                </div>
                <div>
                  <div class="lh-sm">{{ item.name }}</div>
                  <div class="lh-sm">
                    {{ item.neighborhood }}
                    <span class="opacity-75" v-if="item.distance"> {{ item.distance }} km</span>
                  </div>
                </div>
              </nuxt-link>
            </div>

            <quick-map class="my-3" :marker="item" />
            <template v-if="$store.state.user.id === item.owner">
              <!-- <button class="btn" @click="$store.commit('modals/show', { name: 'updateAd' })">
                <i class="bi bi-pencil-square"></i> Edit item
              </button> -->
              <button class="btn text-danger" @click="removeAd()"><i class="bi bi-x-lg"></i> Delete item</button>
            </template>
          </div>
        </div>
      </div>
    </section>
    <section v-if="similar.length > 0">
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
const { removeAd } = require("@/utils/storage/ads.js");

export default {
  data() {
    return {
      id: undefined,
      curImage: 0,
    };
  },

  created() {
    this.id = this.$route.params.id;
  },
  computed: {
    item() {
      return this.$store.state.data.ads.find((a) => a.id === this.id);
    },

    mine() {
      return 1 === 2; // this.$store.state.user.id === this.item.owner;
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

  methods: {
    async updateAd() {},
    async removeAd() {
      await removeAd(this.item.owner, this.item.i);
      this.$store.commit("data/removeAd", this.item.id);
      this.$router.push("/account");
    },
  },
};
</script>

<style></style>
