<template>
  <div class="roadmap">
    <div
      class="roadmap--item"
      :class="item.i === stateI ? 'roadmap--item--active' : false"
      v-for="(item, i) in $options.items.filter((item) => item.i <= stateI)"
      :key="i"
    >
      {{ item.version }}

      <!-- {{ item.i === stateI ? "(current)" : "" }} -->
    </div>
  </div>
</template>

<script>
export default {
  states: ["Created", "Accepted", "Borrowed", "Returned", "Ended"],

  items: [
    {
      i: 0,
      version: "Requested",
    },
    {
      i: 1,
      version: "Accepted",
    },
    {
      i: 2,
      version: "Borrowed",
    },
    {
      i: 3,
      version: "Returned",
    },
    {
      i: 4,
      version: "Checked",
    },
    {
      i: 5,
      version: "Reviewed",
    },
  ],

  computed: {
    stateI() {
      return this.$options.states.indexOf(this.$store.state.request.state);
    },
  },
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

    &:first-child:not(:last-child)::before {
      // first
      @extend .line;
      top: 40%;
      bottom: 0;
    }

    &:not(:last-child):not(:first-child)::before {
      //middle
      @extend .line;
      top: 0;
      bottom: 0;
    }

    &:last-child:not(:first-child)::before {
      // last
      @extend .line;
      top: 0;
      bottom: 40%;
    }

    &--active {
      font-weight: bold;
      //   background-color: yellow;

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
