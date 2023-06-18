<template>
  <nuxt-link :to="$store.state.user.signedIn ? '/app' : '/'" aria-label="to homepage">
    <div class="logo"></div>
  </nuxt-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  background-image: url("@/assets/images/logo-mobile.svg");
  width: 53px;
  height: 53px;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.2, 0, 0.1, 1);

  @include media-breakpoint-up(lg) {
    background-image: url("@/assets/images/logo.svg");
    width: 94px * 1.4;
    height: 20px * 1.4;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
