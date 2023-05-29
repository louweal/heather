export const state = () => ({
  ads: [],
  calls: [],
  owners: [],
});

export const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
    state.ads.forEach((a) => (a["position"] = state.owners.find((o) => o.id === a.owner).position));
    state.ads.forEach((a) => (a["name"] = state.owners.find((o) => o.id === a.owner).name));
  },
  SET_CALLS(state, payload) {
    state.calls = payload;
  },
  SET_OWNERS(state, payload) {
    state.owners = payload;
  },
};
