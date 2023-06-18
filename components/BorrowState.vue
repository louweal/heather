<template>
  <div class="borrow-state">
    <div
      class="borrow-state--item"
      :class="item.i === stateI ? 'borrow-state--item--active' : false"
      v-for="(item, i) in $options.items"
      :key="i"
    >
      {{ item.state === "Borrowed" ? type : item.state }}
    </div>
  </div>
</template>

<script>
export default {
  states: ["Created", "Accepted", "Borrowed", "Returned", "Checked", "Reviewed"],

  items: [
    {
      i: 0,
      state: "Requested",
    },
    {
      i: 1,
      state: "Accepted",
    },
    {
      i: 2,
      state: "Borrowed",
    },
    {
      i: 3,
      state: "Returned",
    },
    {
      i: 4,
      state: "Checked",
    },
    {
      i: 5,
      state: "Reviewed",
    },
  ],

  props: {
    type: {
      type: String,
      default: "Borrow",
    },
  },

  computed: {
    stateI() {
      return this.$options.states.indexOf(this.$store.state.request.state);
    },
  },
};
</script>

<style lang="scss" scoped>
.borrow-state {
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
