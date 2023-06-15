<template>
  <main class="text-center">
    <div class="btn btn-primary mb-2" @click="createUsers()">Create dummy users on Hedera</div>

    <p>Inspect the console for details</p>
  </main>
</template>

<script>
import owners from "@/data/owners";

export default {
  owners,

  methods: {
    async createUsers() {
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

      let users = this.$options.owners;
      for (let i = 0; i < users.length; i++) {
        let user = users[i];

        let id = dummies[user.id];

        let metadata = {
          name: user.name,
          neighborhood: user.neighborhood,
          location: { lat: user.lat, lng: user.lng },
          email: user.name.toLowerCase() + "@hedera.com",
          phone: "01234567",
        };

        // let payload = {
        //   contractId: process.env.S_CONTRACT,
        //   accountId: id,
        //   metadata: metadata,
        // };

        // // console.log(payload);

        // let res = await this.$store.dispatch("user/addDummyUser", payload);
      }
    },
  },
};
</script>

<style></style>
