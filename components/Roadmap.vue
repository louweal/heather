<template>
  <div class="roadmap">
    <nuxt-link
      :to="{ hash: `#v${item.id}` }"
      class="roadmap--item cp"
      :class="item.current ? 'roadmap--item--active' : false"
      v-for="(item, i) in $options.items"
      :key="i"
    >
      {{ item.version }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  items: [
    {
      id: "01",
      version: "26 May - 2 June",
    },
    {
      id: "03",
      version: "2 June - 9 June",
    },
    {
      id: "04",
      version: "9 June - 19 June",
    },
    {
      id: "05",
      version: "19 June - 25 June",
    },
    {
      id: "06",
      version: "25 June onwards",
      current: true,
    },
  ],
};
</script>

<style lang="scss" scoped>
.roadmap {
  &--item {
    display: block;
    position: relative;
    padding-left: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.3s 0.1s ease-in;

    &:hover:not(&--active)::after {
      background-color: $secondary;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 13px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: $light;
      transition: background-color 0.3s 0.1s ease-in;
    }

    &:first-child::before {
      @extend .line;
      top: 40%;
      bottom: 0;
    }

    &:not(:last-child):not(:first-child)::before {
      @extend .line;
      top: 0;
      bottom: 0;
    }

    &:last-child::before {
      @extend .line;
      top: 0;
      bottom: 40%;
    }

    &--active {
      font-weight: bold;
      &::after {
        background-color: #000;
      }
    }
  }
}

.line {
  content: "";
  position: absolute;
  left: 6px;
  width: 2px;
  background-color: $light;
}
</style>
