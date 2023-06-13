<template>
  <div class="bg-white rounded overflow-hidden">
    <div class="row">
      <div class="col-12 col-md-4">
        <nuxt-link to="/app/detail/idddd">
          <ratio-visual :data="{ visual: 'jambo.jpeg', name: 'jambo' }" ratio="1x1" />
        </nuxt-link>
      </div>
      <div class="col-12 col-md-8">
        <div class="p-2 d-flex flex-column justify-content-between">
          <div>
            <div class="fw-bold">02/03/2023</div>
            <p>Hi ${data.name}, I would like to ${data.type} your ${data.title}. Kind regards, your neighbor [user.name]</p>

            <div class="row mb-2">
              <div class="col-12 col-md-6">
                <nuxt-link to="/app/user/0.0.00000" class="d-flex gap-2 align-items-center mb-2">
                  <button
                    class="bg-primary p-2 rounded-circle lh-1 text-white"
                    xxxclick="$store.commit('modals/show', { name: 'create', data: data })"
                  >
                    <i class="bi bi-person-fill"></i>
                  </button>
                  <div>
                    <div class="lh-1">[ data.name ]</div>
                    <div class="lh-sm">
                      [ data.neighborhood ]
                      <span class="opacity-75 fw-medium" xxxv-if="data.distance && place"> XX km</span>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="col-12 col-md-6">
                <div class="d-flex gap-2 align-items-center cp">
                  <span class="bg-primary p-2 rounded-circle lh-1 text-white">
                    <i class="bi bi-calendar2-plus-fill"></i>
                  </span>
                  <div>
                    <div class="lh-sm">From: 01/01/2023</div>
                    <div class="lh-sm">Until: 01/01/2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hstack gap-3">
            <div class="d-flex gap-2 align-items-center cp">
              <span class="bg-secondary p-2 rounded-circle lh-1 text-white">
                <i class="bi bi-check-lg"></i>
              </span>
              <div>Accept</div>
            </div>

            <div class="d-flex gap-2 align-items-center cp">
              <span class="bg-dark p-2 rounded-circle lh-1 text-white">
                <i class="bi bi-x-lg"></i>
              </span>
              <div>Decline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
