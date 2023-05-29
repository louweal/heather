<template>
  <main>
    <section>
      todo add calls
      <div class="container-xl" v-if="$store.state.data.ads">
        <div class="row gy-3">
          <div class="col-12 col-sm-6 col-xxl-3" v-for="a in $store.state.data.ads" :key="a.id">
            <card-ad :data="a" />
          </div>
        </div>
      </div>
    </section>
    <modal name="request" title="Request">
      <modal-request />
    </modal>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
