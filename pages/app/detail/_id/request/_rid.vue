<template>
  <main>
    <section>
      <div class="container-xl text-center">
        <div class="btn btn-primary mb-3" @click="getRequest()">View request</div>
        <p>Viewing the request involves Hedera network fees</p>
        {{ $route.params }}
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
