export const state = () => ({
  show: false,
  data: undefined,
  scrollY: 0,
});

export const mutations = {
  show(state, payload) {
    state.scrollY = window.scrollY;

    if (state.show) {
      // another modal is active -> hide it first
      state.show = false;
      state.data = undefined;
      document.body.classList.toggle("disable-scroll"); // enable scroll
    }
    state.show = payload.name;
    state.data = payload.data;
    document.body.style.top = `-${state.scrollY}px`;
    document.body.classList.toggle("disable-scroll"); // disable scroll
  },

  hide(state) {
    state.show = false;
    state.data = undefined;

    document.body.classList.toggle("disable-scroll"); // enable scroll
    console.log(state.scrollY);

    setTimeout(function () {
      window.scrollTo(0, this.scrollY);
    }, 2000);
    console.log(state.scrollY);
    // window.scrollTo(0, this.scrollY);
  },
};
