<template>
  <main>
    <section>
      <div class="container-xl text-center">
        <button class="btn" @click="$router.go(-1)"><i class="bi bi-arrow-left text-primary fs-2"></i></button>

        <br />
        <div class="btn btn-primary mb-3" @click="acceptRequest()">Accept request</div>
        <p>Accepting the request involves Hedera network fees</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
