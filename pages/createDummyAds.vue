<template>
  <main class="text-center">
    <div class="btn btn-primary mb-2" @click="createAds()">Create dummy ads on Hedera</div>

    <p>Inspect the console for details</p>

    <p>Reload dApp to see results</p>
  </main>
</template>

<script>
import ads from "@/data/ads";
const { addAd } = require("@/utils/storage/ads.js");

export default {
  ads,

  data() {
    return {
      deploy: true,
    };
  },

  methods: {
    async createAds() {
      let ads = this.$options.ads;

      let dummies = [
        "0.0.14171302",
        "0.0.14171303",
        "0.0.14171305",
        "0.0.14171307",
        "0.0.14171309",
        "0.0.14171310",
        "0.0.14171312",
        "0.0.14171313",
        "0.0.14171314",
        "0.0.14171315",
        "0.0.14171316",
        "0.0.14171317",
        "0.0.14171318",
        "0.0.14171319",
        "0.0.14171320",
        "0.0.14171321",
        "0.0.14171322",
        "0.0.14171323",
        "0.0.14171324",
        "0.0.14171325",
        "0.0.14171326",
        "0.0.14171327",
        "0.0.14171328",
        "0.0.14171329",
        "0.0.14171330",
        "0.0.14171331",
        "0.0.14171332",
        "0.0.14171333",
        "0.0.14171334",
        "0.0.14171335",
      ];

      for (let i = 0; i < ads.length; i++) {
        let ad = ads[i];
        let owner = dummies[ad.owner];

        let data = {
          id: self.crypto.randomUUID(),
          title: ad.title,
          description: ad.description,
          visuals: ad.visuals,
          type: ad.type,
          category: ad.category,
          owner: owner,
          deposit: ad.deposit,
          rent: ad.rent,
          date: ad.date / 1000,
        };

        // add new ad to hedera storage
        let status = await addAd(owner, data);

        if (status === "SUCCESS") {
          //
        } else {
          console.log("Something went wrong");
        }
      }
    },
  },
};
</script>

<style></style>
