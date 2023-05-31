<template>
  <main>
    <section>
      <div class="container-xl" v-if="$store.state.data.ads">
        <div class="row gy-3">
          <div class="col-12 col-sm-6 col-xxl-3" v-for="a in $store.state.data.both" :key="a.id">
            <card-call v-if="a.type === 'call'" :data="a" />

            <card-ad v-else :data="a" />
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
