<template>
  <main>
    <section>
      <div class="container-xl text-center">
        <h1>Owner</h1>

        <p>Manage borrow request with ID {{ $route.params.rid }}</p>
        <ul class="nav flex-column">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$route.path + '/view'">View request</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$route.path + '/state'">Check state</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/accept'">Accept request</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/accept-extend'"
              >Accept extension request</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/confirm-return'">Confirm return</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/accept-return'">Accept return</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/report-problem'">Report problem</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/report-missing'">Report missing</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/write-review'">Write review</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/settle-deposit'">Settle deposit</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div class="container-xl text-center">
        <h1>Borrower</h1>

        <p>Manage your borrow request with ID {{ $route.params.rid }}</p>
        <ul class="nav flex-column">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$route.path + '/view'">View</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$route.path + '/state'">Check state</nuxt-link>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/start'">Borrow</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/request-extend'">Request extend</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/return-borrow'">Return borrow</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link disabled" :to="$route.path + '/write-review'">Write review</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
