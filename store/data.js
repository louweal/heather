export const state = () => ({
  ads: [],
  calls: [],
  owners: [],
});

export const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
  },
  SET_CALLS(state, payload) {
    state.calls = payload;
  },
  SET_OWNERS(state, payload) {
    state.owners = payload;
  },
};
