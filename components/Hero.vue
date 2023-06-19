<template>
  <div class="hero d-flex flex-column justify-content-around mb-3">
    <div class="hero--bg"></div>

    <div class="hero--inner w-100">
      <div class="container-xl">
        <div class="row">
          <div class="col-12 col-lg-7" data-aos="fade-up-scale" data-aos-duration="1000">
            <vue-typed-js
              :strings="['tent', 'hammer', 'bicycle', 'suitcase']"
              :loop="true"
              :typeSpeed="90"
              :backSpeed="80"
              :startDelay="1300"
              :showCursor="false"
            >
              <h1 class="hero--title display-1 lh-sm pb-2">Hi Heather, can I borrow a <span class="typing">tent</span>?</h1>
            </vue-typed-js>
            <h2 class="hero--intro mb-3">
              Minimize your environmental impact and save money by sharing resources within your local community.
            </h2>
            <nuxt-link
              to="/app"
              event=""
              @click.native="$store.state.user.signedIn ? $router.push('/app') : $store.commit('modals/show', { name: 'connect' })"
              class="btn btn-primary mb-4"
              >Launch app <i class="bi bi-arrow-right"></i
            ></nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- empty -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hero {
  // background-color: #000;
  position: relative;
  height: 100vh; // min(100%, 100vh);

  &--inner {
    z-index: 2;
  }

  &--title {
    color: $primary;
    min-height: 152px;
    span {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: $primary;
      color: transparent;
      color: $light;

      @include media-breakpoint-up(md) {
        -webkit-text-stroke-width: 2px;
      }
    }
  }

  &--intro {
    font-size: 1.625rem;
    font-family: $font-family-base;
    line-height: 1.5;
  }

  &--bg {
    overflow: hidden;
    z-index: 1;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-image: url("@/assets/images/city-skyline.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
    opacity: 0.5;

    @include media-breakpoint-up(lg) {
      background-size: contain;
      background-position: bottom center;
      opacity: 1;
    }
  }
}
</style>
