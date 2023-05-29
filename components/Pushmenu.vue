<template>
  <div class="pushmenu p-2 d-lg-none" v-if="$store.state.pushmenu.open">
    <div class="pushmenu--header d-flex w-100 justify-content-between align-items-center">
      <logo
        @click.native="
          $store.commit('pushmenu/toggle');
          $router.push('/');
        "
      />

      <div @click="$store.commit('pushmenu/toggle')">
        <i class="bi lh-1 text-primary" style="font-size: 44px" :class="$store.state.pushmenu.open ? 'bi-x-lg' : 'bi-list'"></i>
      </div>
    </div>

    <div class="pushmenu--body">
      <ul>
        <li>Sign in</li>
        <li>Register</li>
      </ul>
    </div>

    <div class="pushmenu--footer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.pushmenu {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: #fff;
  // color: #fff;
  text-align: center;
  transform: translateY(-100%);
  opacity: 0.2;
  animation: slideY 0.4s 0.05s ease-out forwards, fadeIn 0.3s 0s linear forwards;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
}
</style>
